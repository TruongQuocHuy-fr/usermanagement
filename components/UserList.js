import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { List, Snackbar, Appbar, Card } from 'react-native-paper';
import { getUsers, deleteUser } from '../userService';

function UserList({ refresh, onEditUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    console.log("Fetching users...");
    setLoading(true);
    try {
      const data = await getUsers();
      console.log("Fetched users:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage('Không thể tải danh sách người dùng.');
      setVisible(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const handleDelete = async (id) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa người dùng này?",
      [
        { text: "Hủy", style: "cancel" },
        { text: "Xóa", onPress: async () => {
            console.log("Deleting user with ID:", id);
            try {
              await deleteUser(id);
              fetchUsers();
              setMessage('Người dùng đã được xóa.');
              setVisible(true);
            } catch (error) {
              console.error("Error deleting user:", error);
              setMessage('Không thể xóa người dùng.');
              setVisible(true);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Danh Sách Người Dùng" alignItems='center'/>
      </Appbar.Header>
      
      {users.length === 0 ? (
        <Text style={styles.emptyText}>Không có người dùng nào.</Text>
      ) : (
        users.map((user) => (
          <Card key={user.id} style={styles.card}>
            <List.Item
              title={user.name}
              description={`${user.email} - Tuổi: ${user.age}`}
              left={props => <List.Icon {...props} icon="account" />}
              right={() => (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => onEditUser(user)}>
                    <List.Icon icon="pencil" style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(user.id)}>
                    <List.Icon icon="trash-can" style={styles.icon} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </Card>
        ))
      )}
      
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={3000}
      >
        {message}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 1,
    color: '#6200ee', // Màu sắc cho icon
  },
});

export default UserList;
