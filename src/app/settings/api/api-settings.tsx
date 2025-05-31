// 'use client';
// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


// //api/v1/public/exchange
// const EXCHANGE_LIST = [
//   {
//     id: 'binance',
//     name: 'Binance',
//     type: 'crypto',
//     category: 'centralized',
//     status: 'active',
//     logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=032',
//     requiredFields: ['apiKey', 'secret'],
//     description: 'Popular crypto trading platform',
//   },
//   {
//     id: 'coinbase',
//     name: 'Coinbase',
//     type: 'crypto',
//     category: 'centralized',
//     status: 'active',
//     logo: 'https://cryptologos.cc/logos/coinbase-coinbase-logo.png?v=032',
//     requiredFields: ['apiKey', 'secret', 'passphrase'],
//     description: 'US-based secure exchange',
//   },
//   {
//     id: 'uniswap',
//     name: 'Uniswap',
//     type: 'crypto',
//     category: 'decentralized',
//     status: 'active',
//     logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=032',
//     requiredFields: ['apiKey'],
//     description: 'Decentralized exchange (DEX)',
//   },
//   {
//     id: 'robinhood',
//     name: 'Robinhood',
//     type: 'stock',
//     category: 'us',
//     status: 'notsupported',
//     logo: 'https://seeklogo.com/images/R/robinhood-logo-51C27DD260-seeklogo.com.png',
//     requiredFields: [],
//     description: 'US stock & crypto broker',
//   },
//   {
//     id: 'indiastock',
//     name: 'India Stock Exchange',
//     type: 'stock',
//     category: 'indian',
//     status: 'active',
//     logo: 'https://seeklogo.com/images/I/indian-stock-exchange-logo-ABB1B6AC83-seeklogo.com.png',
//     requiredFields: ['apiKey', 'secret'],
//     description: 'Indian stock exchange',
//   },
//   {
//     id: 'kucoin',
//     name: 'KuCoin',
//     type: 'crypto',
//     category: 'centralized',
//     status: 'inactive',
//     logo: 'https://cryptologos.cc/logos/kucoin-shares-kcs-logo.png?v=032',
//     requiredFields: ['apiKey', 'secret'],
//     description: 'Altcoin-focused exchange',
//   },
//   {
//     id: 'forex1',
//     name: 'Forex One',
//     type: 'forex',
//     category: 'global',
//     status: 'active',
//     logo: 'https://seeklogo.com/images/F/forex-logo-3C73ABBC60-seeklogo.com.png',
//     requiredFields: ['apiKey'],
//     description: 'Global Forex exchange',
//   },
//   {
//     id: 'otherex',
//     name: 'Other Exchange',
//     type: 'other',
//     category: 'misc',
//     status: 'active',
//     logo: 'https://seeklogo.com/images/O/other-exchange-logo-1234.png',
//     requiredFields: ['apiKey'],
//     description: 'Other type exchange',
//   },
// ];

// // Normalize inactive -> notsupported (merging status)
// const normalizedExchanges = EXCHANGE_LIST.map((ex) =>
//   ex.status === 'inactive' ? { ...ex, status: 'notsupported' } : ex
// );

// //api/v1/private/exchange
// const USER_EXCHANGES = {
//   binance: 'connected',
//   coinbase: 'error',
//   kucoin: 'not_connected',
// };

// export default function ExchangeConnectPage() {
//   const [selectedCategory, setSelectedCategory] = useState<string>(normalizedExchanges[0]?.type || '');
//   const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
//   const [selectedExchange, setSelectedExchange] = useState(null);
//   const [credentials, setCredentials] = useState<Record<string, string>>({});

//   // Get unique categories (top level tabs)
//   const categories = Array.from(new Set(normalizedExchanges.map((ex) => ex.type)));

//   // Get subcategories for selected category (second level tabs)
//   const subcategories = Array.from(
//     new Set(normalizedExchanges.filter((ex) => ex.type === selectedCategory).map((ex) => ex.category))
//   );

//   // On category change, reset subcategory to first available
//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     const firstSub = normalizedExchanges.find((ex) => ex.type === category)?.category || '';
//     setSelectedSubcategory(firstSub);
//   };

//   // On subcategory change
//   const handleSubcategoryChange = (subcategory: string) => {
//     setSelectedSubcategory(subcategory);
//   };

//   const getDotColor = (id: string) => {
//     const status = USER_EXCHANGES[id];
//     return status === 'connected' ? 'bg-green-600' : status === 'error' ? 'bg-red-600' : 'bg-gray-400';
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Submitted for:', selectedExchange, credentials);
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setCredentials((prev) => ({ ...prev, [field]: value }));
//   };

//   const renderExchange = (exchange: any) => {
//     const disabled = exchange.status === 'notsupported';

//     return (
//       <div
//         key={exchange.id}
//         onClick={() => !disabled && setSelectedExchange(exchange)}
//         className={`relative group p-5 rounded-xl border transition-all cursor-pointer min-h-[100px] ${
//           disabled ? 'opacity-40 cursor-not-allowed border-gray-300' : 'hover:border-black border-gray-400'
//         } bg-white flex items-center gap-4 shadow-sm`}
//       >
//         {disabled ? (
//           <span className="absolute top-1 left-2 text-xs bg-gray-300 text-black px-2 py-0.5 rounded">
//             Inactive
//           </span>
//         ) : (
//           <div className={`absolute top-2 right-2 h-2.5 w-2.5 rounded-full ${getDotColor(exchange.id)}`}></div>
//         )}
//         <img src={exchange.logo} alt={exchange.name} width={40} height={40} className="rounded-full" />
//         <div className="flex flex-col">
//           <p className="font-semibold text-sm text-black">{exchange.name}</p>
//           <p className="text-xs text-gray-600">{exchange.description}</p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen p-6 bg-white text-black">
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-10">
//         <h1 className="text-3xl font-bold text-center">Connect Your Exchange</h1>

//         {/* Top-level category tabs */}
//         <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full mb-6">
//           <TabsList className="grid grid-cols-4 bg-gray-200 rounded-lg overflow-hidden">
//             {categories.map((cat) => (
//               <TabsTrigger key={cat} value={cat} className="text-black capitalize">
//                 {cat}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {/* Inside each category, render subcategory tabs */}
//           <TabsContent value={selectedCategory}>
//             <Tabs value={selectedSubcategory} onValueChange={handleSubcategoryChange} className="w-full mb-6">
//               <TabsList className="grid grid-cols-4 bg-gray-100 rounded-lg overflow-hidden">
//                 {subcategories.map((sub) => (
//                   <TabsTrigger key={sub} value={sub} className="text-black capitalize">
//                     {sub}
//                   </TabsTrigger>
//                 ))}
//               </TabsList>

//               <TabsContent value={selectedSubcategory}>
//                 <div>
//                   <h2 className="text-xl font-semibold capitalize mb-2 text-black">
//                     {selectedSubcategory} Exchanges
//                   </h2>
//                   <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
//                     {normalizedExchanges
//                       .filter((ex) => ex.type === selectedCategory && ex.category === selectedSubcategory)
//                       .map(renderExchange)}
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </TabsContent>
//         </Tabs>

//         {/* Exchange connect modal */}
//         {selectedExchange && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               className="bg-gray-100 border border-gray-400 rounded-xl p-6 space-y-4 w-full max-w-md shadow-lg"
//             >
//               <h2 className="text-lg font-bold text-center text-black">Connect {selectedExchange.name}</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {selectedExchange.requiredFields.map((field: string) => (
//                   <div key={field} className="relative">
//                     <Input
//                       placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                       onChange={(e) => handleInputChange(field, e.target.value)}
//                       value={credentials[field] || ''}
//                       className="bg-white text-black border-gray-400"
//                     />
//                     {USER_EXCHANGES[selectedExchange.id] === 'error' && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 text-xs text-black border-black hover:bg-gray-200"
//                       >
//                         Test Connect
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//                 <Button className="w-full" type="submit" variant="default">
//                   Connect
//                 </Button>
//               </form>
//               <button
//                 onClick={() => setSelectedExchange(null)}
//                 className="text-sm text-center underline w-full text-black"
//               >
//                 Cancel
//               </button>
//             </motion.div>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }
