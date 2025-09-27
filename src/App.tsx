import React, { useState, useEffect } from 'react';
import { 
  Home, 
  History, 
  Megaphone, 
  Plus, 
  Wallet,
  Play,
  Trophy,
  Calendar,
  DollarSign,
  Smartphone,
  Car,
  Gift,
  ArrowLeft,
  Check,
  X
} from 'lucide-react';

interface Game {
  id: number;
  name: string;
  image: string;
  value: number;
  category: string;
}

interface PlayRecord {
  id: number;
  gameName: string;
  date: string;
  amount: number;
  result: 'won' | 'lost';
  prize?: string;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  type: 'promotion' | 'winner' | 'update' | 'launch';
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'played' | 'announcements'>('home');
  const [balance, setBalance] = useState(1500);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'jazzcash' | 'easypaisa' | null>(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  const [games] = useState<Game[]>([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 500,
      category: 'smartphone'
    },
    {
      id: 2,
      name: 'Gaming Laptop',
      image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 800,
      category: 'electronics'
    },
    {
      id: 3,
      name: 'Honda Bike',
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 1000,
      category: 'vehicle'
    },
    {
      id: 4,
      name: 'PlayStation 5',
      image: 'https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 300,
      category: 'gaming'
    },
    {
      id: 5,
      name: 'Smart Watch',
      image: 'https://images.pexels.com/photos/1420709/pexels-photo-1420709.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 200,
      category: 'wearable'
    },
    {
      id: 6,
      name: 'Amazon Voucher',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
      value: 100,
      category: 'voucher'
    }
  ]);

  const [playHistory, setPlayHistory] = useState<PlayRecord[]>([
    {
      id: 1,
      gameName: 'iPhone 15 Pro',
      date: '2024-01-15',
      amount: 500,
      result: 'lost'
    },
    {
      id: 2,
      gameName: 'Smart Watch',
      date: '2024-01-14',
      amount: 200,
      result: 'won',
      prize: 'Apple Watch Series 9'
    },
    {
      id: 3,
      gameName: 'Amazon Voucher',
      date: '2024-01-13',
      amount: 100,
      result: 'lost'
    }
  ]);

  const [announcements] = useState<Announcement[]>([
    {
      id: 1,
      title: '🎉 New iPhone 16 Added!',
      content: 'Experience the latest iPhone 16 Pro Max in our gaming collection. Premium device with cutting-edge features now available to win!',
      date: '2024-01-15',
      type: 'launch'
    },
    {
      id: 2,
      title: '🏆 Winner Alert: Sarah K.',
      content: 'Congratulations to Sarah K. from Karachi for winning the Honda Civic in yesterday\'s mega draw! Your dream car is ready for delivery.',
      date: '2024-01-14',
      type: 'winner'
    },
    {
      id: 3,
      title: '🔥 Weekend Special: 50% Bonus',
      content: 'Add cash this weekend and get 50% extra balance! Valid for JazzCash and Easypaisa transactions above PKR 1000.',
      date: '2024-01-13',
      type: 'promotion'
    },
    {
      id: 4,
      title: '⚡ System Update Complete',
      content: 'We\'ve enhanced our payment system for faster transactions and improved security. Enjoy seamless gaming experience!',
      date: '2024-01-12',
      type: 'update'
    },
    {
      id: 5,
      title: '🎮 Gaming Console Week',
      content: 'Special week featuring PlayStation 5, Xbox Series X, and Nintendo Switch. Higher winning chances on all gaming products!',
      date: '2024-01-11',
      type: 'promotion'
    }
  ]);

  const handleAddCash = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod || !paymentAmount) return;
    
    const amount = parseInt(paymentAmount);
    setBalance(prev => prev + amount);
    setShowPaymentModal(false);
    setShowPaymentSuccess(true);
    setPaymentAmount('');
    setSelectedPaymentMethod(null);
    
    setTimeout(() => setShowPaymentSuccess(false), 3000);
  };

  const handlePlayGame = (game: Game) => {
    if (balance >= game.value) {
      const isWin = Math.random() > 0.7; // 30% win chance
      setBalance(prev => prev - game.value);
      
      const newPlay: PlayRecord = {
        id: Date.now(),
        gameName: game.name,
        date: new Date().toISOString().split('T')[0],
        amount: game.value,
        result: isWin ? 'won' : 'lost',
        prize: isWin ? game.name : undefined
      };
      
      setPlayHistory(prev => [newPlay, ...prev]);
    }
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'winner': return '🏆';
      case 'promotion': return '🔥';
      case 'launch': return '🎉';
      case 'update': return '⚡';
      default: return '📢';
    }
  };

  const formatCurrency = (amount: number) => {
    return `PKR ${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                🎮 Fundplay
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <Wallet size={18} className="text-yellow-400" />
                <span className="text-white font-semibold">{formatCurrency(balance)}</span>
              </div>
              <button
                onClick={handleAddCash}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">Add Cash</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/5 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                currentPage === 'home'
                  ? 'border-yellow-400 text-yellow-400'
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('played')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                currentPage === 'played'
                  ? 'border-yellow-400 text-yellow-400'
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              <History size={20} />
              <span>Played</span>
            </button>
            <button
              onClick={() => setCurrentPage('announcements')}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                currentPage === 'announcements'
                  ? 'border-yellow-400 text-yellow-400'
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              <Megaphone size={20} />
              <span>Announcements</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <div>
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Welcome to <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Fundplay</span>
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Play, Win, Repeat! Try your luck and win amazing prizes including smartphones, bikes, and exclusive vouchers.
              </p>
            </div>

            {/* Popular Games */}
            <section>
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center space-x-2">
                <Trophy className="text-yellow-400" />
                <span>Popular Games</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                  <div key={game.id} className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
                    <div className="aspect-w-16 aspect-h-9 relative">
                      <img
                        src={game.image}
                        alt={game.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm">
                        {formatCurrency(game.value)}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-white mb-2">{game.name}</h4>
                      <p className="text-white/70 mb-4 capitalize">{game.category}</p>
                      <button
                        onClick={() => handlePlayGame(game)}
                        disabled={balance < game.value}
                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                          balance >= game.value
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Play size={20} />
                        <span>{balance >= game.value ? 'Play Now' : 'Insufficient Balance'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentPage === 'played' && (
          <div>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center space-x-2">
              <History className="text-blue-400" />
              <span>Play History</span>
            </h3>
            
            {playHistory.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History size={40} className="text-white/50" />
                </div>
                <p className="text-white/70 text-lg">No plays yet. Start playing to see your history!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {playHistory.map((play) => (
                  <div key={play.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white">{play.gameName}</h4>
                        <div className="flex items-center space-x-4 text-white/70 mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar size={16} />
                            <span>{play.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign size={16} />
                            <span>{formatCurrency(play.amount)}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                        play.result === 'won'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {play.result === 'won' ? <Check size={20} /> : <X size={20} />}
                        <span className="font-semibold capitalize">{play.result}</span>
                      </div>
                    </div>
                    {play.prize && (
                      <div className="mt-3 p-3 bg-yellow-400/20 rounded-lg">
                        <p className="text-yellow-400 font-medium">🎉 Prize Won: {play.prize}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentPage === 'announcements' && (
          <div>
            <h3 className="text-3xl font-bold text-white mb-8 flex items-center space-x-2">
              <Megaphone className="text-orange-400" />
              <span>Announcements</span>
            </h3>
            
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <article key={announcement.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getAnnouncementIcon(announcement.type)}</div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">{announcement.title}</h4>
                      <p className="text-white/80 mb-4 leading-relaxed">{announcement.content}</p>
                      <div className="flex items-center justify-between text-sm text-white/60">
                        <span>{announcement.date}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          announcement.type === 'winner' ? 'bg-yellow-400/20 text-yellow-400' :
                          announcement.type === 'promotion' ? 'bg-red-500/20 text-red-400' :
                          announcement.type === 'launch' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {announcement.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Add Cash</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (PKR)
                </label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Payment Method
                </label>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedPaymentMethod('jazzcash')}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                      selectedPaymentMethod === 'jazzcash'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <Smartphone className="text-purple-600" size={24} />
                    <span className="font-medium">JazzCash</span>
                  </button>
                  <button
                    onClick={() => setSelectedPaymentMethod('easypaisa')}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center space-x-3 ${
                      selectedPaymentMethod === 'easypaisa'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <Wallet className="text-green-600" size={24} />
                    <span className="font-medium">Easypaisa</span>
                  </button>
                </div>
              </div>
              
              <button
                onClick={handlePayment}
                disabled={!selectedPaymentMethod || !paymentAmount}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add {paymentAmount ? formatCurrency(parseInt(paymentAmount)) : 'Cash'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showPaymentSuccess && (
        <div className="fixed top-4 right-4 bg-emerald-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-2">
          <Check size={20} />
          <span>Payment successful! Balance updated.</span>
        </div>
      )}
    </div>
  );
}

export default App;