"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  BarChart3, 
  Search, 
  Bell, 
  FileText, 
  Store, 
  Users, 
  User as UserIcon, 
  LogOut,
  Plus,
  Eye,
  Edit,
  Copy,
  Send,
  Printer,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

export default function QuotesPage() {
  const [activePage, setActivePage] = useState('quotes');
  const [activeTab, setActiveTab] = useState('sent');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const user = {
    name: "Fatou Enterprises",
    email: "fatou@enterprises.sn",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100"
  };

  const quotes = {
    sent: [
      {
        id: "DV001",
        date: "28/08/25",
        client: "Restaurant Terrou-Bi",
        products: "20 poulets + 100 œufs",
        total: "145,000",
        validity: "3 jours",
        status: "En attente",
        clientInfo: {
          name: "Restaurant Terrou-Bi",
          contact: "Mamadou Sarr",
          phone: "+221 33 859 59 59",
          email: "commandes@terroubihotel.com",
          address: "Route de la Corniche Ouest, Dakar"
        },
        items: [
          { product: "Poulets fermiers bio", quantity: 20, unitPrice: 4500, total: 90000 },
          { product: "Œufs bio extra frais", quantity: 100, unitPrice: 550, total: 55000 }
        ]
      },
      {
        id: "DV002",
        date: "26/08/25",
        client: "Hôtel Radisson",
        products: "50 poulets fermiers",
        total: "225,000",
        validity: "Expiré",
        status: "Expiré",
        clientInfo: {
          name: "Hôtel Radisson Blu",
          contact: "Aïcha Diop",
          phone: "+221 33 869 69 69",
          email: "procurement@radissonblu.sn",
          address: "Route de Ngor, Dakar"
        },
        items: [
          { product: "Poulets fermiers premium", quantity: 50, unitPrice: 4500, total: 225000 }
        ]
      },
      {
        id: "DV003",
        date: "25/08/25",
        client: "Particulier Dakar",
        products: "10 poulets + cages",
        total: "87,500",
        validity: "Accepté",
        status: "Accepté",
        clientInfo: {
          name: "Ibrahima Fall",
          contact: "Ibrahima Fall",
          phone: "+221 77 555 888",
          email: "ibrahima.fall@gmail.com",
          address: "Parcelles Assainies, Dakar"
        },
        items: [
          { product: "Poulets fermiers", quantity: 10, unitPrice: 4500, total: 45000 },
          { product: "Cages transport", quantity: 2, unitPrice: 21250, total: 42500 }
        ]
      }
    ],
    drafts: [
      {
        id: "DV004",
        date: "29/08/25",
        client: "Chez Loutcha",
        products: "30 poulets + aliments",
        total: "156,500",
        validity: "Brouillon",
        status: "Brouillon"
      }
    ],
    accepted: [
      {
        id: "DV003",
        date: "25/08/25",
        client: "Particulier Dakar",
        products: "10 poulets + cages",
        total: "87,500",
        validity: "Accepté",
        status: "Accepté"
      }
    ],
    expired: [
      {
        id: "DV002",
        date: "26/08/25",
        client: "Hôtel Radisson",
        products: "50 poulets fermiers",
        total: "225,000",
        validity: "Expiré",
        status: "Expiré"
      }
    ]
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'search', label: 'Rechercher Producteurs', icon: <Search className="h-4 w-4" /> },
    { id: 'alerts', label: 'Mes Alertes', icon: <Bell className="h-4 w-4" /> },
    { id: 'quotes', label: 'Mes Devis', icon: <FileText className="h-4 w-4" /> },
    { id: 'brand', label: 'Ma Marque', icon: <Store className="h-4 w-4" /> },
    { id: 'clients', label: 'Mes Clients', icon: <Users className="h-4 w-4" /> },
    { id: 'profile', label: 'Mon Profil', icon: <UserIcon className="h-4 w-4" /> },
    { id: 'logout', label: 'Déconnexion', icon: <LogOut className="h-4 w-4" /> }
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      'En attente': 'bg-orange-100 text-orange-800',
      'Accepté': 'bg-green-100 text-green-800',
      'Expiré': 'bg-red-100 text-red-800',
      'Brouillon': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status as keyof typeof statusStyles] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const handleAction = (action: string, quoteId: string) => {
    if (action === 'view') {
      const quote = Object.values(quotes).flat().find(q => q.id === quoteId);
      setSelectedQuote(quote);
      setShowDetailsModal(true);
    }
    setOpenDropdown(null);
  };

  const getCurrentQuotes = () => {
    return quotes[activeTab as keyof typeof quotes] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header identique */}
      <div className="bg-gray-100 text-gray-700 text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">📞</span>
            <span>Nous sommes disponibles 24h/7j, Besoin d'aide ?</span>
            <span className="text-green-600 font-semibold">+221 77 123 45 67</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <a href="#" className="hover:text-green-600">À Propos</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-green-600">Nous Contacter</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-green-600">Mon Compte</a>
            <span className="text-gray-400">|</span>
            <a href="#" className="hover:text-green-600 flex items-center gap-1">
              🔒 Déconnexion
            </a>
          </div>
        </div>
      </div>

      <div className="bg-matix-green-dark text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <div className="bg-white text-matix-green-dark p-2 rounded-lg mr-3">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-matix-yellow">MATIX</h1>
                <p className="text-xs text-matix-yellow opacity-90">M A R T</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-matix-green-medium font-medium">Accueil</Link>
            <Link href="/categories" className="text-gray-700 hover:text-matix-green-medium font-medium">Catégories</Link>
            <Link href="#" className="text-gray-700 hover:text-matix-green-medium font-medium">À Propos</Link>
            <Link href="#" className="text-gray-700 hover:text-matix-green-medium font-medium">Contact</Link>
            <Link href="/offres" className="text-matix-yellow font-medium">Offres</Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              {/* Profile Section */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-blue-600">Distributeur</p>
              </div>

              {/* Menu Navigation */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.id === 'dashboard' ? '/dashboard/distributor' : `/dashboard/distributor/${item.id}`}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activePage === item.id 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Devis Clients</h1>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                onClick={() => setShowModal(true)}
              >
                <Plus className="h-4 w-4" />
                Nouveau Devis
              </Button>
            </div>

            {/* Onglets */}
            <div className="mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-6 py-3 font-medium text-sm ${
                    activeTab === 'sent'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('sent')}
                >
                  Devis Envoyés
                </button>
                <button
                  className={`px-6 py-3 font-medium text-sm ${
                    activeTab === 'drafts'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('drafts')}
                >
                  Brouillons
                </button>
                <button
                  className={`px-6 py-3 font-medium text-sm ${
                    activeTab === 'accepted'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('accepted')}
                >
                  Acceptés
                </button>
                <button
                  className={`px-6 py-3 font-medium text-sm ${
                    activeTab === 'expired'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('expired')}
                >
                  Expirés
                </button>
              </div>
            </div>

            {/* Tableau Devis */}
            <Card className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">N° Devis</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Produits</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Montant Total</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Validité</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Statut</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCurrentQuotes().map((quote, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900">{quote.id}</td>
                        <td className="py-3 px-4 text-gray-600">{quote.date}</td>
                        <td className="py-3 px-4 text-gray-600">{quote.client}</td>
                        <td className="py-3 px-4 text-gray-600">{quote.products}</td>
                        <td className="py-3 px-4 font-medium text-gray-900">{quote.total} FCFA</td>
                        <td className="py-3 px-4 text-gray-600">{quote.validity}</td>
                        <td className="py-3 px-4">{getStatusBadge(quote.status)}</td>
                        <td className="py-3 px-4">
                          <div className="relative">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => setOpenDropdown(openDropdown === quote.id ? null : quote.id)}
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            
                            {/* Actions Dropdown */}
                            {openDropdown === quote.id && (
                              <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                <button
                                  onClick={() => handleAction('view', quote.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="text-sm">Voir détails</span>
                                </button>
                                <button
                                  onClick={() => handleAction('edit', quote.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Edit className="h-4 w-4" />
                                  <span className="text-sm">Modifier</span>
                                </button>
                                <button
                                  onClick={() => handleAction('duplicate', quote.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Copy className="h-4 w-4" />
                                  <span className="text-sm">Dupliquer</span>
                                </button>
                                <button
                                  onClick={() => handleAction('send', quote.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Send className="h-4 w-4" />
                                  <span className="text-sm">Envoyer</span>
                                </button>
                                <button
                                  onClick={() => handleAction('print', quote.id)}
                                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <Printer className="h-4 w-4" />
                                  <span className="text-sm">Imprimer</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal Nouveau Devis */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Créer un Nouveau Devis</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form className="p-6 space-y-6">
              {/* Informations Client */}
              <div>
                <h4 className="font-medium mb-4">Informations Client</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Nom du client" />
                  <Input placeholder="Téléphone" />
                  <Input placeholder="Email" />
                  <Input placeholder="Adresse" />
                </div>
              </div>

              {/* Produits */}
              <div>
                <h4 className="font-medium mb-4">Produits</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <Input placeholder="Nom du produit" />
                    </div>
                    <div className="col-span-2">
                      <Input type="number" placeholder="Qté" />
                    </div>
                    <div className="col-span-3">
                      <Input type="number" placeholder="Prix unitaire" />
                    </div>
                    <div className="col-span-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditions */}
              <div>
                <h4 className="font-medium mb-4">Conditions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Validité (jours)
                    </label>
                    <Input type="number" defaultValue="7" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Délai de livraison
                    </label>
                    <Input placeholder="Ex: 2-3 jours" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Créer Devis
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Détails Devis */}
      {showDetailsModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">Détails Devis #{selectedQuote.id}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowDetailsModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations Client */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  Informations Client
                </h4>
                {selectedQuote.clientInfo && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4 text-gray-400" />
                      <span>{selectedQuote.clientInfo.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{selectedQuote.clientInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{selectedQuote.clientInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{selectedQuote.clientInfo.address}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Produits */}
              <div>
                <h4 className="font-medium mb-3">Produits Demandés</h4>
                {selectedQuote.items && (
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Produit</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Qté</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Prix Unit.</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-600">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedQuote.items.map((item: any, index: number) => (
                          <tr key={index} className="border-t border-gray-100">
                            <td className="py-2 px-3 text-sm">{item.product}</td>
                            <td className="py-2 px-3 text-sm">{item.quantity}</td>
                            <td className="py-2 px-3 text-sm">{item.unitPrice.toLocaleString()} FCFA</td>
                            <td className="py-2 px-3 text-sm font-medium">{item.total.toLocaleString()} FCFA</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Résumé */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Montant Total</span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">{selectedQuote.total} FCFA</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Validité</span>
                  </div>
                  <span className="text-sm">{selectedQuote.validity}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Modifier
                </Button>
                <Button variant="outline" className="flex-1 flex items-center gap-2">
                  <Copy className="h-4 w-4" />
                  Dupliquer
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Envoyer
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Imprimer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section App */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Obtenez Vos Besoins Quotidiens Depuis Notre Boutique Matix
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Il y a de nombreux produits que vous trouverez dans notre boutique. 
                Choisissez votre produit nécessaire quotidien dans notre boutique Matix 
                et obtenez des offres spéciales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-6" />
                  Google Play
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white flex items-center gap-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-6" />
                  App Store
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl">🛒</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Livraison Gratuite</div>
                <div className="text-sm text-gray-500">À partir de 50,000 FCFA</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Support 24/7</div>
                <div className="text-sm text-gray-500">À tout moment</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Paiement Sécurisé</div>
                <div className="text-sm text-gray-500">100% Sécurisé</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <div className="font-semibold">Dernières Offres</div>
                <div className="text-sm text-gray-500">Jusqu'à 25% de réduction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-matix-footer-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company */}
            <div>
              <h3 className="text-xl font-bold text-matix-yellow mb-6">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">À Propos Matix</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Carrières</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dernières Nouvelles</a></li>
              </ul>
            </div>

            {/* Latest News */}
            <div>
              <h3 className="text-xl font-bold text-matix-yellow mb-6">Latest News</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Volailles & Viande</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Aliments Avicoles</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Équipements</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Santé & Vétérinaire</a></li>
              </ul>
            </div>

            {/* My Account */}
            <div>
              <h3 className="text-xl font-bold text-matix-yellow mb-6">My Account</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mes Commandes</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Commandes Récentes</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mettre à Jour Profil</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-white text-matix-green-dark p-2 rounded-lg">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-matix-yellow">MATIX MART</h1>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Marché Colobane, Dakar, Sénégal
              </p>
              <p className="text-gray-300 mb-2">Tél : +221 77 123 45 67</p>
              <p className="text-gray-300">Email : contact@matix.sn</p>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Suivez-nous:</span>
                <div className="flex gap-3">
                  <div className="bg-blue-600 p-2 rounded-full">
                    <span className="text-white text-sm">f</span>
                  </div>
                  <div className="bg-black p-2 rounded-full">
                    <span className="text-white text-sm">X</span>
                  </div>
                  <div className="bg-red-500 p-2 rounded-full">
                    <span className="text-white text-sm">P</span>
                  </div>
                  <div className="bg-blue-700 p-2 rounded-full">
                    <span className="text-white text-sm">in</span>
                  </div>
                  <div className="bg-green-500 p-2 rounded-full">
                    <span className="text-white text-sm">W</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-400">
                  Appelez-nous: <span className="text-matix-yellow font-bold text-xl">+221771234567</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">Orange Money</div>
                <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Wave</div>
              </div>
            </div>

            <div className="text-center mt-8 pt-6 border-t border-gray-800">
              <p className="text-gray-400">
                Copyright 2024 © <span className="text-matix-yellow">MatixLover</span>. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}