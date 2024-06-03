import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CreateTabModal from 'components/Modal/CreateTabModal';
import css from './Tabs.module.css';
import { useAuth } from '../LoginForm/AuthContext';

const Tabs = ({ defaultActiveIndex, children }) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex || 0);
  const [isCreateTabModalOpen, setIsCreateTabModalOpen] = useState(false);
  const [tabs, setTabs] = useState([]);
  const { authToken } = useAuth();
  const didFetchTabs = useRef(false);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await axios.get('https://cool-chat.club/api/tabs/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        setTabs(response.data);
      } catch (error) {
        console.error('Error fetching tabs:', error);
        setTabs([]);
      }
    };

    if (!didFetchTabs.current) {
      fetchTabs();
      didFetchTabs.current = true;
    }
  }, [authToken]);

  const openCreateTabModal = () => {
    setIsCreateTabModalOpen(true);
  };

  const closeCreateTabModal = (e) => {
    e?.stopPropagation();
    setIsCreateTabModalOpen(false);
  };

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={css.tabs}>
      <div className={css.tabHeader}>
        {Array.isArray(tabs) && tabs.map((tab, index) => (
          <div
            key={tab.id}
            className={`${css.tabTitle} ${index === activeIndex ? css.active : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.name_tab}
          </div>
        ))}
        <button onClick={openCreateTabModal}>Create Tab</button>
      </div>
      <div className={css.tabContent}>
        {Array.isArray(tabs) && tabs.map((tab, index) =>
          index === activeIndex ? (
            <Tab key={tab.id} title={tab.name_tab}>
              <p>Content for {tab.name_tab}</p>
            </Tab>
          ) : null
        )}
      </div>
      <CreateTabModal isOpen={isCreateTabModalOpen} onClose={closeCreateTabModal} />
    </div>
  );
};

const Tab = ({ title, children }) => {
  return (
    <div className={css.tab}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export { Tabs, Tab };
