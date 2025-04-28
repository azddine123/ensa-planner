import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import config from '../../config';
import { XMarkIcon, DocumentArrowUpIcon, ExclamationCircleIcon, CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import * as XLSX from 'xlsx';
import { CLASSES, classToLevelAndBranch } from '../../utils/constants';

const ProjectGroups = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Groupe A',
      project: 'Application Web',
      members: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      class: 'TDI2',
      status: 'En cours'
    }
  ]);

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [newGroup, setNewGroup] = useState({
    name: '',
    project: '',
    members: [],
    class: '',
    status: 'En cours'
  });

  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [assignedStudents, setAssignedStudents] = useState({});
  const [confirmReassign, setConfirmReassign] = useState(false);
  const [studentsToReassign, setStudentsToReassign] = useState([]);

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Charger la liste des étudiants au montage du composant
  useEffect(() => {
    fetchStudents();
    fetchGroups();
  }, []);

  // Filtrer les étudiants lorsque la classe est modifiée
  useEffect(() => {
    if (newGroup.class) {
      const { branch, level } = classToLevelAndBranch(newGroup.class);
      
      const filtered = students.filter(student => 
        student.branch === branch && student.level.charAt(0) === level.charAt(0)
      );
      
      setFilteredStudents(filtered);
      setSelectedStudents([]);
      setNewGroup(prev => ({...prev, members: []}));
    } else {
      setFilteredStudents([]);
    }
  }, [newGroup.class, students]);

  // Fonction pour récupérer les étudiants
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL}/auth/students`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des étudiants');
      }

      const data = await response.json();
      setStudents(data);
      
      // Préparer la liste des étudiants déjà assignés
      const assignedMap = {};
      groups.forEach(group => {
        group.members.forEach(member => {
          if (typeof member === 'object' && member._id) {
            assignedMap[member._id] = group.name;
          }
        });
      });
      setAssignedStudents(assignedMap);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour récupérer les groupes
  const fetchGroups = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${config.API_URL}/groups`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des groupes');
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setGroups(data);
      }
      
    } catch (err) {
      console.error('Erreur lors du chargement des groupes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Générer des suggestions pour le nom et le projet
  const generateSuggestions = () => {
    if (newGroup.class && !newGroup.name) {
      const groupCount = groups.filter(g => g.class === newGroup.class).length + 1;
      const suggestedName = `Groupe ${newGroup.class}-${groupCount}`;
      const suggestedProject = `Projet Web - ${suggestedName}`;
      
      setNewGroup(prev => ({
        ...prev,
        name: suggestedName,
        project: suggestedProject
      }));
    }
  };

  // Vérifier si des étudiants sont déjà assignés
  const checkAssignedStudents = (selectedStudentsArray) => {
    if (!selectedStudentsArray || selectedStudentsArray.length === 0) return [];
    
    const reassignStudents = selectedStudentsArray.filter(student => 
      assignedStudents[student._id]
    );
    
    if (reassignStudents.length > 0) {
      setStudentsToReassign(reassignStudents);
      setConfirmReassign(true);
      return selectedStudentsArray.filter(student => !assignedStudents[student._id]);
    }
    
    return selectedStudentsArray;
  };

  // Ajouter/supprimer un étudiant de la sélection
  const toggleStudentSelection = (student) => {
    const isSelected = selectedStudents.some(s => s._id === student._id);
    
    if (isSelected) {
      setSelectedStudents(prev => prev.filter(s => s._id !== student._id));
      setNewGroup(prev => ({
        ...prev,
        members: prev.members.filter(id => id !== student._id)
      }));
    } else {
      const updatedStudents = [...selectedStudents, student];
      const checkedStudents = checkAssignedStudents(updatedStudents);
      
      if (!confirmReassign) {
        setSelectedStudents(checkedStudents);
        setNewGroup(prev => ({
          ...prev,
          members: checkedStudents.map(s => s._id)
        }));
      }
    }
  };

  // Confirmer la réassignation
  const confirmStudentReassignment = () => {
    const updatedStudents = [...selectedStudents, ...studentsToReassign];
    setSelectedStudents(updatedStudents);
    setNewGroup(prev => ({
      ...prev,
      members: updatedStudents.map(s => s._id)
    }));
    
    setConfirmReassign(false);
    setStudentsToReassign([]);
  };

  // Importer des groupes depuis Excel
  const handleFileImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        // Traiter les données importées
        if (jsonData.length > 0) {
          const importedGroups = jsonData.map((row, index) => {
            return {
              id: groups.length + index + 1,
              name: row.Nom || `Groupe Importé ${index + 1}`,
              project: row.Projet || '',
              members: (row.Membres || '').split(',').map(m => m.trim()),
              class: row.Classe || '',
              status: 'En cours'
            };
          });
          
          setGroups([...groups, ...importedGroups]);
          setNotification({
            type: 'success',
            message: `${importedGroups.length} groupes importés avec succès`
          });
          
          setTimeout(() => setNotification(null), 5000);
        }
      } catch (err) {
        setNotification({
          type: 'error',
          message: 'Erreur lors de l\'import: format de fichier incorrect'
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Générer des suggestions si les champs sont vides
    let finalGroup = { ...newGroup };
    if (!finalGroup.name || !finalGroup.project) {
      const groupCount = groups.filter(g => g.class === finalGroup.class).length + 1;
      
      if (!finalGroup.name) {
        finalGroup.name = `Groupe ${finalGroup.class}-${groupCount}`;
      }
      
      if (!finalGroup.project) {
        finalGroup.project = `Projet Web - ${finalGroup.name}`;
      }
    }
    
    try {
      setNotification(null);
      
      // Récupérer le token depuis le localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Vous devez être connecté');
      }
      
      // Préparer les données à envoyer au backend
      const groupData = {
        name: finalGroup.name,
        project: finalGroup.project,
        members: finalGroup.members,
        class: finalGroup.class,
        status: finalGroup.status
      };
      
      // Envoyer les données au backend
      const response = await fetch(`${config.API_URL}/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(groupData)
      });
      
      // Gestion de la réponse
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la création du groupe");
      }
      
      // Récupérer les données du groupe créé
      const data = await response.json();
      console.log('Groupe créé avec succès:', data);
      
      // Ajouter le groupe à l'état local avec l'ID généré par le backend
      setGroups([...groups, { ...finalGroup, id: data.group._id || groups.length + 1 }]);
      
      // Afficher une notification de succès
      setNotification({
        type: 'success',
        message: "Le groupe a été créé avec succès"
      });
      
      // Fermer le formulaire
      setShowAddForm(false);
      
      // Réinitialiser le formulaire
      setNewGroup({
        name: '',
        project: '',
        members: [],
        class: '',
        status: 'En cours'
      });
      setSelectedStudents([]);
      
      setTimeout(() => setNotification(null), 5000);
      
    } catch (error) {
      console.error("Erreur lors de la création du groupe:", error);
      
      // Afficher le message d'erreur
      setNotification({
        type: 'error',
        message: error.message || "Erreur lors de la création du groupe"
      });
      
      setTimeout(() => setNotification(null), 10000);
    }
  };

  // Filtrer les étudiants par recherche
  const filteredStudentsBySearch = searchTerm
    ? filteredStudents.filter(student => 
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredStudents;

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Gestion des Groupes de Projet</h1>
            <div className="flex space-x-4">
              <select
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Toutes les classes</option>
                {CLASSES.map(classe => (
                  <option key={classe.value} value={classe.value}>
                    {classe.label}
                  </option>
                ))}
              </select>
              <div className="flex space-x-2">
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
                >
                  <DocumentArrowUpIcon className="w-5 h-5 mr-1" />
                  Importer
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".xlsx, .xls" 
                  onChange={handleFileImport}
                />
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Nouveau Groupe
                </button>
              </div>
            </div>
          </div>

          {notification && (
            <div className={`mb-4 p-3 rounded-md flex items-center ${
              notification.type === 'success' ? 'bg-green-50 text-green-800' : 
              notification.type === 'warning' ? 'bg-yellow-50 text-yellow-800' : 
              'bg-red-50 text-red-800'
            }`}>
              {notification.type === 'success' ? (
                <CheckCircleIcon className="w-5 h-5 mr-2" />
              ) : notification.type === 'warning' ? (
                <ExclamationCircleIcon className="w-5 h-5 mr-2 text-yellow-500" />
              ) : (
                <ExclamationCircleIcon className="w-5 h-5 mr-2" />
              )}
              {notification.message}
            </div>
          )}

          {/* Liste des groupes */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom du Groupe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membres
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groups
                  .filter(group => !selectedClass || group.class === selectedClass)
                  .map(group => (
                    <tr key={group.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{group.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{group.project}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {Array.isArray(group.members) ? group.members.join(', ') : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{group.class}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          group.status === 'En cours' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {group.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Éditer</button>
                        <button className="text-red-600 hover:text-red-900">Supprimer</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Modal d'ajout de groupe */}
          {showAddForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-6 border w-[700px] shadow-lg rounded-md bg-white">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-medium text-gray-900">Nouveau Groupe de Projet</h3>
                  <button onClick={() => setShowAddForm(false)} className="text-gray-500 hover:text-gray-700">
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2 lg:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Classe <span className="text-red-500">*</span></label>
                      <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newGroup.class}
                        onChange={(e) => {
                          setNewGroup({
                            ...newGroup, 
                            class: e.target.value,
                            members: [] // Réinitialiser les membres si la classe change
                          });
                        }}
                        required
                      >
                        <option value="">Sélectionner une classe</option>
                        {CLASSES.map(classe => (
                          <option key={classe.value} value={classe.value}>
                            {classe.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="col-span-2 lg:col-span-1">
                      <div className="flex justify-between">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Groupe</label>
                        <button
                          type="button"
                          onClick={generateSuggestions}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Suggérer
                        </button>
                      </div>
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newGroup.name}
                        onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                        placeholder={newGroup.class ? `Groupe ${newGroup.class}-1` : ''}
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <div className="flex justify-between">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Projet</label>
                        <button
                          type="button"
                          onClick={generateSuggestions}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Suggérer
                        </button>
                      </div>
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newGroup.project}
                        onChange={(e) => setNewGroup({...newGroup, project: e.target.value})}
                        placeholder={newGroup.name ? `Projet Web - ${newGroup.name}` : ''}
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Membres <span className="text-red-500">*</span>
                        {!newGroup.class && (
                          <span className="text-sm text-gray-500 ml-2">(Sélectionnez d'abord une classe)</span>
                        )}
                      </label>
                      
                      {/* Sélecteur d'étudiants personnalisé */}
                      <div className="relative" ref={dropdownRef}>
                        <div 
                          className={`border rounded-md p-2 min-h-12 flex flex-wrap gap-2 cursor-pointer ${
                            !newGroup.class ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                          }`}
                          onClick={() => newGroup.class && setDropdownOpen(!dropdownOpen)}
                        >
                          {selectedStudents.length > 0 ? (
                            selectedStudents.map(student => (
                              <div key={student._id} className="bg-blue-100 rounded px-2 py-1 text-sm flex items-center">
                                <span>{student.firstName} {student.lastName}</span>
                                <button 
                                  type="button"
                                  className="ml-1 text-gray-500 hover:text-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStudentSelection(student);
                                  }}
                                >
                                  <XMarkIcon className="w-4 h-4" />
                                </button>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-500">
                              {newGroup.class 
                                ? 'Sélectionnez les membres du groupe' 
                                : 'Sélectionnez d\'abord une classe'}
                            </span>
                          )}
                        </div>
                        
                        {dropdownOpen && newGroup.class && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            <div className="p-2 border-b">
                              <input
                                type="text"
                                placeholder="Rechercher un étudiant..."
                                className="w-full p-2 border rounded-md"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                            
                            <ul className="py-1">
                              {filteredStudentsBySearch.length > 0 ? (
                                filteredStudentsBySearch.map(student => {
                                  const isSelected = selectedStudents.some(s => s._id === student._id);
                                  const isAssigned = assignedStudents[student._id];
                                  
                                  return (
                                    <li 
                                      key={student._id}
                                      className={`px-3 py-2 cursor-pointer flex justify-between items-center ${
                                        isSelected ? 'bg-blue-50' : 'hover:bg-gray-100'
                                      }`}
                                      onClick={() => toggleStudentSelection(student)}
                                    >
                                      <div>
                                        <span className="block">{student.firstName} {student.lastName}</span>
                                        {isAssigned && (
                                          <span className="text-xs text-orange-600">
                                            Déjà dans: {isAssigned}
                                          </span>
                                        )}
                                      </div>
                                      {isSelected && (
                                        <CheckIcon className="w-4 h-4 text-blue-600" />
                                      )}
                                    </li>
                                  );
                                })
                              ) : (
                                <li className="px-3 py-2 text-gray-500">Aucun étudiant trouvé</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200 mt-6">
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                        disabled={!newGroup.class || selectedStudents.length === 0}
                      >
                        Créer le groupe
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal de confirmation pour la réassignation d'étudiants */}
          {confirmReassign && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-6 border w-[500px] shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Confirmation de réassignation
                </h3>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex items-start">
                    <ExclamationCircleIcon className="w-5 h-5 text-yellow-600 mr-2" />
                    <div>
                      <p className="text-sm text-yellow-700">
                        Les étudiants suivants sont déjà assignés à d'autres groupes :
                      </p>
                      <ul className="mt-2 pl-5 list-disc text-sm text-yellow-700">
                        {studentsToReassign.map(student => (
                          <li key={student._id}>
                            {student.firstName} {student.lastName} - Groupe actuel: {assignedStudents[student._id]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                    onClick={() => {
                      setConfirmReassign(false);
                      setStudentsToReassign([]);
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    onClick={confirmStudentReassignment}
                  >
                    Confirmer la réassignation
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectGroups; 