import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UnitSystem = 'metric' | 'imperial';
type LandUnit = 'acre' | 'hectare' | 'guntha';

interface SettingsContextType {
    units: {
        system: UnitSystem;
        land: LandUnit;
    };
    notifications: {
        weather: boolean;
        market: boolean;
        community: boolean;
        tips: boolean;
    };
    dataSaver: boolean;
    updateUnits: (key: keyof SettingsContextType['units'], value: string) => void;
    toggleNotification: (key: keyof SettingsContextType['notifications']) => void;
    toggleDataSaver: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    // Initialize from localStorage or default
    const [units, setUnits] = useState<SettingsContextType['units']>(() => {
        const saved = localStorage.getItem('app_units');
        return saved ? JSON.parse(saved) : { system: 'metric', land: 'acre' };
    });

    const [notifications, setNotifications] = useState<SettingsContextType['notifications']>(() => {
        const saved = localStorage.getItem('app_notifications');
        return saved ? JSON.parse(saved) : { weather: true, market: true, community: true, tips: false };
    });

    const [dataSaver, setDataSaver] = useState<boolean>(() => {
        const saved = localStorage.getItem('app_dataSaver');
        return saved ? JSON.parse(saved) : false;
    });

    // Persist changes
    useEffect(() => {
        localStorage.setItem('app_units', JSON.stringify(units));
    }, [units]);

    useEffect(() => {
        localStorage.setItem('app_notifications', JSON.stringify(notifications));
    }, [notifications]);

    useEffect(() => {
        localStorage.setItem('app_dataSaver', JSON.stringify(dataSaver));
    }, [dataSaver]);

    const updateUnits = (key: keyof SettingsContextType['units'], value: string) => {
        setUnits(prev => ({ ...prev, [key]: value }));
    };

    const toggleNotification = (key: keyof SettingsContextType['notifications']) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleDataSaver = () => {
        setDataSaver(prev => !prev);
    };

    return (
        <SettingsContext.Provider value={{ units, notifications, dataSaver, updateUnits, toggleNotification, toggleDataSaver }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
