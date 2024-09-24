import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AddUser from './components/AddUser';
import UserList from './components/UserList';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const refreshUsers = () => {
    console.log("Refreshing users...");
    setRefresh(prev => !prev);
  };

  const handleEditUser = (user) => {
    console.log("Editing user:", user);
    setEditingUser(user);
  };

  const handleClearEditingUser = () => {
    console.log("Clearing editing user");
    setEditingUser(null);
  };

  return (
    <SafeAreaProvider>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
          {editingUser ? 'Cập Nhật Người Dùng' : 'Thêm Người Dùng'}
        </Text>
        <AddUser 
          refreshUsers={refreshUsers} 
          editingUser={editingUser} 
          setEditingUser={handleClearEditingUser} 
        />
        <UserList 
          refresh={refresh} 
          onEditUser={handleEditUser} 
        />
      </View>
    </SafeAreaProvider>
  );
}

export default App;
