import { useState } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw, Zap, Network, Radio } from 'lucide-react';
import { useI18n } from '../../../app/i18n';

interface WiringSimulatorProps {
  productName: string;
  productCategory?: string;
}

interface Port {
  id: string;
  name: string;
  correctCableId: string;
}

interface Cable {
  id: string;
  name: string;
  color: string;
  icon: any;
}

export function WiringSimulator({ productName, productCategory }: WiringSimulatorProps) {
  const { t } = useI18n();

  const getScenario = () => {
    const cat = (productCategory || '').toLowerCase();
    if (cat.includes('cctv')) {
      return {
        ports: [{ id: 'port-power', name: t.wiringSimulator.portPowerIn, correctCableId: 'cable-power' }],
        cables: [
          { id: 'cable-power', name: t.wiringSimulator.cablePowerSupply, color: 'bg-red-500', icon: Zap },
          { id: 'cable-wrong', name: t.wiringSimulator.cableLan, color: 'bg-blue-500', icon: Network }
        ]
      };
    } else if (cat.includes('network') || cat.includes('access point')) {
      return {
        ports: [{ id: 'port-lan', name: t.wiringSimulator.portLan, correctCableId: 'cable-lan' }],
        cables: [
          { id: 'cable-lan', name: t.wiringSimulator.cableLan, color: 'bg-blue-500', icon: Network },
          { id: 'cable-wrong', name: t.wiringSimulator.cablePowerAdapter, color: 'bg-red-500', icon: Zap }
        ]
      };
    } else if (cat.includes('ip camera') || cat.includes('nvr')) {
      return {
        ports: [{ id: 'port-nvr-lan', name: t.wiringSimulator.portNvrLan, correctCableId: 'cable-lan' }],
        cables: [
          { id: 'cable-lan', name: t.wiringSimulator.cableLan, color: 'bg-blue-500', icon: Network },
          { id: 'cable-wrong', name: t.wiringSimulator.cableSignalWire, color: 'bg-yellow-500', icon: Radio }
        ]
      };
    }
    return {
      ports: [
        { id: 'port-power', name: t.wiringSimulator.port12vDcPowerIn, correctCableId: 'cable-power' },
        { id: 'port-lan', name: t.wiringSimulator.portRj45Network, correctCableId: 'cable-lan' },
        { id: 'port-alarm', name: t.wiringSimulator.portAlarmIo, correctCableId: 'cable-alarm' }
      ],
      cables: [
        { id: 'cable-lan', name: t.wiringSimulator.cableCat6Lan, color: 'bg-blue-500', icon: Network },
        { id: 'cable-power', name: t.wiringSimulator.cable12vAdapter, color: 'bg-red-500', icon: Zap },
        { id: 'cable-alarm', name: t.wiringSimulator.cableSignalWire, color: 'bg-yellow-500', icon: Radio },
        { id: 'cable-wrong', name: t.wiringSimulator.cable24vAcAdapter, color: 'bg-orange-500', icon: Zap }
      ]
    };
  };

  const { ports, cables } = getScenario();

  const [selectedCable, setSelectedCable] = useState<string | null>(null);
  const [connections, setConnections] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePortClick = (portId: string) => {
    if (!selectedCable) {
      setErrorMsg(t.wiringSimulator.selectCableError);
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    const port = ports.find(p => p.id === portId);
    if (port?.correctCableId !== selectedCable) {
      setErrorMsg(t.wiringSimulator.incorrectConnectionError.replace('{port}', port?.name || ''));
      setTimeout(() => setErrorMsg(null), 3000);
      return;
    }

    setConnections(prev => ({ ...prev, [portId]: selectedCable }));
    setSelectedCable(null);
    setErrorMsg(null);
  };

  const isComplete = ports.every(p => connections[p.id] === p.correctCableId);
  const completionPercent = Math.round((Object.keys(connections).length / ports.length) * 100);

  return (
    <div className="">
      <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{t.wiringSimulator.title.replace('{productName}', productName)}</h3>
            <p className="text-slate-400 text-sm">{t.wiringSimulator.subtitle}</p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <div className="text-2xl font-bold text-indigo-400">{completionPercent}%</div>
            <div className="text-xs text-slate-400 uppercase">{t.wiringSimulator.percentCompleted}</div>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3 text-red-200">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm">{errorMsg}</p>
          </div>
        )}

        {isComplete && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-3 text-green-200 animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">{t.wiringSimulator.connectionSuccess}</p>
              <p className="text-xs text-green-300 mt-1">{t.wiringSimulator.readyForUse}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cables Section */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">{t.wiringSimulator.cablesHeader}</h4>
            <div className="space-y-3">
              {cables.map(cable => {
                const isUsed = Object.values(connections).includes(cable.id);
                const isSelected = selectedCable === cable.id;
                const Icon = cable.icon;

                return (
                  <button
                    key={cable.id}
                    disabled={isUsed}
                    onClick={() => setSelectedCable(isSelected ? null : cable.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                      isUsed 
                        ? 'opacity-50 border-slate-700 bg-slate-800/50 cursor-not-allowed'
                        : isSelected
                          ? 'border-indigo-500 bg-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                          : 'border-slate-600 bg-slate-700/50 hover:bg-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center ${cable.color} bg-opacity-20`}>
                        <Icon size={16} className={cable.color.replace('bg-', 'text-')} />
                      </div>
                      <span className={`text-sm font-medium ${isUsed ? 'text-slate-500' : 'text-slate-200'}`}>
                        {cable.name}
                      </span>
                    </div>
                    {isSelected && <span className="text-xs text-indigo-400 font-medium">{t.wiringSimulator.cableSelectedBadge}</span>}
                    {isUsed && <span className="text-xs text-slate-500 font-medium flex items-center gap-1"><CheckCircle2 size={12}/> {t.wiringSimulator.cableConnectedBadge}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Device Ports Section */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 flex flex-col">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">{t.wiringSimulator.portsHeader}</h4>
            <div className="flex-1 flex flex-col justify-center gap-4">
              {ports.map(port => {
                const connectedCableId = connections[port.id];
                const connectedCable = cables.find(c => c.id === connectedCableId);
                const isConnected = !!connectedCableId;

                return (
                  <button
                    key={port.id}
                    onClick={() => handlePortClick(port.id)}
                    disabled={isConnected}
                    className={`w-full relative flex items-center p-4 rounded-xl border-2 transition-all ${
                      isConnected 
                        ? `border-green-500/50 bg-green-500/10` 
                        : selectedCable 
                          ? 'border-slate-500 bg-slate-700/80 hover:border-indigo-400 cursor-pointer animate-pulse-slow' 
                          : 'border-slate-700 bg-slate-800 cursor-pointer hover:border-slate-600'
                    }`}
                  >
                    <div className="flex-1 text-left">
                      <div className="text-xs text-slate-400 mb-1">{t.wiringSimulator.portSmallLabel}</div>
                      <div className={`font-semibold ${isConnected ? 'text-green-400' : 'text-white'}`}>{port.name}</div>
                    </div>

                    <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center bg-slate-900 z-10 relative ${
                      isConnected ? 'border-green-500' : 'border-slate-600'
                    }`}>
                      {isConnected ? (
                         <CheckCircle2 size={20} className="text-green-500" />
                      ) : (
                         <div className="w-4 h-4 rounded-full bg-slate-700" />
                      )}
                    </div>

                    {/* Wire Visual (appears when connected) */}
                    {isConnected && (
                      <div className={`absolute right-[-1rem] top-1/2 -translate-y-1/2 w-8 h-2 rounded-r-full ${connectedCable?.color}`}></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {Object.keys(connections).length > 0 && (
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => {
                setConnections({});
                setSelectedCable(null);
                setErrorMsg(null);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors border border-slate-700"
            >
              <RefreshCw size={16} />
              {t.wiringSimulator.resetBtn}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
