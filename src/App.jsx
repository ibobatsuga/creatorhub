import React, { useState, useMemo } from 'react';
import initialCreators from './data/creators.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertiesStrip from './components/PropertiesStrip';
import InsightsSection from './components/InsightsSection';
import KOLDirectory from './components/KOLDirectory';
import CampaignKanban from './components/CampaignKanban';
import ContractModal from './components/ContractModal';
import GoogleSheetSyncModal from './components/GoogleSheetSyncModal';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [creators, setCreators] = useState(initialCreators);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('22 Okt 2026, 19:10 WIB');
  const [selectedContractCreator, setSelectedContractCreator] = useState(null);

  // Initialize campaign roster with a realistic initial team across stages
  const [roster, setRoster] = useState([
    { ...initialCreators[0], stage: 'Live', dealCost: 450000 },       // alimrohman
    { ...initialCreators[1], stage: 'Content', dealCost: 500000 },    // puteri_ka
    { ...initialCreators[2], stage: 'Deal', dealCost: 650000 },       // kristina arsenio
    { ...initialCreators[3], stage: 'Negotiation', dealCost: 600000 },// andaliadhika
    { ...initialCreators[5], stage: 'Outreach', dealCost: 750000 },   // yessyaviant
  ]);

  // Aggregate Stats
  const totalFollowers = useMemo(() => {
    return creators.reduce((acc, curr) => acc + (Number(curr.followers) || 0), 0);
  }, [creators]);

  const totalSpend = useMemo(() => {
    return roster.reduce((acc, curr) => acc + (Number(curr.dealCost) || Number(curr.rateCard) || 0), 0);
  }, [roster]);

  const regionStats = useMemo(() => {
    const counts = {};
    creators.forEach(c => {
      if (c.region) counts[c.region] = (counts[c.region] || 0) + 1;
    });
    return Object.entries(counts).map(([region, count]) => ({ region, count }));
  }, [creators]);

  // Handlers
  const handleAddToRoster = (creator) => {
    if (roster.some(r => r.id === creator.id)) return;
    setRoster(prev => [
      ...prev,
      { ...creator, stage: 'Outreach', dealCost: creator.rateCard }
    ]);
  };

  const handleRemoveFromRoster = (id) => {
    setRoster(prev => prev.filter(r => r.id !== id));
  };

  const handleMoveStage = (id, newStage) => {
    setRoster(prev => prev.map(r => r.id === id ? { ...r, stage: newStage } : r));
  };

  const handleDraftContract = (creator) => {
    setSelectedContractCreator(creator);
  };

  const handleContractSigned = (id) => {
    // If creator in roster, advance to Deal stage or Content
    setRoster(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, stage: r.stage === 'Outreach' || r.stage === 'Negotiation' ? 'Deal' : r.stage };
      }
      return r;
    }));
  };

  // Live Sheet Refetch Function
  const handleRefreshSheet = async () => {
    setIsSyncing(true);
    try {
      const csvUrl = "https://docs.google.com/spreadsheets/d/1_7Ii5hVHqS-B2R6YMISCY9CQ8WKOtx3yQJ6mD1kubUk/export?format=csv&gid=0";
      const resp = await fetch(csvUrl);
      if (resp.ok) {
        const text = await resp.text();
        // Parse CSV simple
        const lines = text.split('\n');
        if (lines.length > 3) {
          const rows = lines.slice(3).filter(l => l.trim().length > 0);
          const parsed = rows.map((line, idx) => {
            const cols = line.split(',');
            const followers = parseInt((cols[9] || '5000').replace(/["',.]/g, ''), 10) || 5000;
            const tier = cols[4] || 'Nano';
            const er = tier === 'Nano' ? 6.5 : tier === 'Micro' ? 4.2 : 2.1;
            const rate = tier === 'Nano' ? 450000 : tier === 'Micro' ? 1800000 : 7500000;

            return {
              id: cols[0] || `HH-${idx + 1}`,
              region: cols[1] || 'DIY Yogyakarta',
              city: cols[2] || 'Yogyakarta',
              entityType: cols[3] || 'KOL',
              tier: tier,
              name: cols[5] || 'Creator',
              handle: cols[6] || '@creator',
              category: cols[7] || 'Lifestyle',
              platform: cols[8] || 'Instagram',
              followers: followers,
              status: cols[10] || 'Active',
              er: er,
              rateCard: rate,
            };
          });
          if (parsed.length > 50) {
            setCreators(parsed);
          }
        }
      }
    } catch (err) {
      console.error("Sheet sync error:", err);
    } finally {
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f4f6] text-[#121217]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sheetCount={creators.length}
        onOpenSync={() => setIsSyncModalOpen(true)}
        isSyncing={isSyncing}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <>
            <Hero
              onExplore={() => setActiveTab('directory')}
              onOpenRoster={() => setActiveTab('campaigns')}
              totalCreators={creators.length}
            />

            <PropertiesStrip regionStats={regionStats} />

            <InsightsSection
              totalCreators={creators.length}
              totalFollowers={totalFollowers}
              totalBudget={520000000}
              totalSpend={totalSpend}
            />

            {/* Quick Preview of Directory */}
            <div className="mt-8">
              <KOLDirectory
                creators={creators}
                onAddToRoster={handleAddToRoster}
                onDraftContract={handleDraftContract}
                rosterIds={roster.map(r => r.id)}
              />
            </div>
          </>
        )}

        {activeTab === 'directory' && (
          <div className="pt-6">
            <KOLDirectory
              creators={creators}
              onAddToRoster={handleAddToRoster}
              onDraftContract={handleDraftContract}
              rosterIds={roster.map(r => r.id)}
            />
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="pt-6">
            <CampaignKanban
              roster={roster}
              onMoveStage={handleMoveStage}
              onRemoveFromRoster={handleRemoveFromRoster}
              onDraftContract={handleDraftContract}
            />
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="pt-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
            <div className="bg-white rounded-3xl p-8 border border-black/[0.05] shadow-soft mb-8">
              <h2 className="font-display text-3xl font-extrabold text-[#111116]">Smart Legal Agreements</h2>
              <p className="text-sm text-[#787884] mt-1">
                Select any verified KOL or media entity from your database of 467 accounts to generate a customized legal agreement.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {roster.map(creator => (
                  <button
                    key={creator.id}
                    onClick={() => handleDraftContract(creator)}
                    className="px-4 py-2 rounded-2xl bg-[#f8f8fa] hover:bg-black/[0.05] border border-black/[0.06] text-xs font-semibold text-[#121217] flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#FF2E7E]"></span>
                    Draft agreement for {creator.name} ({creator.handle})
                  </button>
                ))}
              </div>
            </div>

            <KOLDirectory
              creators={creators.slice(0, 24)}
              onAddToRoster={handleAddToRoster}
              onDraftContract={handleDraftContract}
              rosterIds={roster.map(r => r.id)}
            />
          </div>
        )}
      </main>

      {/* Contract Preview Modal */}
      {selectedContractCreator && (
        <ContractModal
          creator={selectedContractCreator}
          onClose={() => setSelectedContractCreator(null)}
          onSigned={handleContractSigned}
        />
      )}

      {/* Google Sheets Sync Status Modal */}
      <GoogleSheetSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onRefresh={handleRefreshSheet}
        isSyncing={isSyncing}
        totalRows={creators.length}
        lastSyncTime={lastSyncTime}
      />

      {/* Footer */}
      <Footer onExplore={() => setActiveTab('directory')} />
    </div>
  );
}
