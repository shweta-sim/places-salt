import React from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native'

const PopUpWindow = ({ modalVisible, setModalVisible, message, placeName }) => {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.modalBg}>
        <View style={styles.modal}>
          {placeName}
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.modalButton}
            onPress={() => {
              setModalVisible(!modalVisible)
            }}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalText: {
    fontSize: 16,
    paddingBottom: 36
  },
  modalButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#FA8993',
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width - 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    padding: 10
  },
  modalBg: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex: 1,
  },
  modal: {
    width: Dimensions.get('window').width - 70,
    height: Dimensions.get('window').width - 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    alignSelf: 'center'
  },

})

export default PopUpWindow