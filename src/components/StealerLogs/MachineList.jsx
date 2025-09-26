import React from 'react';
import MachineCard from './MachineCard';
import LoadingSpinner from '../Common/LoadingSpinner';

const MachineList = ({ machines, loading, selectedMachine, onSelectMachine }) => {
  if (loading) {
    return <LoadingSpinner message="Loading stealer logs..." />;
  }

  if (machines.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">No machines found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {machines.map((machine) => (
        <MachineCard
          key={machine.machine_id}
          machine={machine}
          onClick={onSelectMachine}
          isSelected={selectedMachine?.machine_id === machine.machine_id}
        />
      ))}
    </div>
  );
};

export default MachineList;