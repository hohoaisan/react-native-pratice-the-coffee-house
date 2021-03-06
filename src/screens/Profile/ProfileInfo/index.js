import React, {useState, useMemo, useContext} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileIndicatorLarge from '../../../components/ProfileIndicatorLarge';
import Button from '../../../components/electrons/Button';
import TextInput from '../../../components/electrons/TextInput';

import {AuthProvider, AuthContext} from '../../../contexts/AuthContext';

const profile = {
  name: 'Hoài Sản',
  dob: '25/11/1999',

  phone: '0935245367',
};
const changeObjectState = (state, setState, feild, text) => {
  let newState = {
    ...state,
  };
  newState[feild] = text;
  setState(newState);
};
const LoginView = ({setRegisterStatus}) => {
  const {signIn} = useContext(AuthContext);
  const [logInfo, setLogInfo] = useState({});
  const feilds = [
    {
      name: 'Email',
      feild: 'email',
    },
    {
      name: 'Mật khẩu',
      feild: 'password',
      secureTextEntry: true,
    },
  ];

  const handleSubmitLogin = () => {
    const {email, password} = logInfo;
    if (email && password) {
      signIn(email, password);
      setLogInfo({});
    } else {
      console.log('Feild not meet requirement');
    }
  };
  return (
    <>
      <View>
        {feilds.map((item, index) => (
          <TextInput
            key={index}
            title={item.name}
            secureTextEntry={item.secureTextEntry}
            onChangeText={(text) =>
              changeObjectState(logInfo, setLogInfo, item.feild, text)
            }>
            {logInfo[item.feild]}
          </TextInput>
        ))}
      </View>
      <View style={[styles.container, styles.profileControls]}>
        <Button onPress={handleSubmitLogin}>Đăng nhập</Button>
        <Button onPress={() => setRegisterStatus(true)}>Đăng kí</Button>
      </View>
    </>
  );
};

const ViewAndEdit = () => {
  const {
    loggedIn,
    user,
    signIn,
    signOut,
    changeInfo,
    updateEmail,
    sendResetPassword,
  } = useContext(AuthContext);
  const [editStatus, setEditStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user.displayName,
    email: user.email,
  });
  const feilds = [
    {
      name: 'Tên',
      feild: 'name',
    },
    {
      name: 'Email',
      feild: 'email',
    },
  ];

  const handleSubmitLogout = () => {
    signOut();
  };

  const handleSubmitEdit = () => {
    let prev = {
      name: user.displayName,
      email: user.email,
    };
    if (!!userInfo.name && prev.name !== userInfo.name) {
      changeInfo(userInfo.name);
    }
    if (!!userInfo.email && prev.email !== userInfo.email) {
      updateEmail(userInfo.email);
    }
    setEditStatus(false);
  };
  return (
    <>
      <View>
        {feilds.map((item, index) => (
          <TextInput
            key={index}
            title={item.name}
            disabled={!editStatus}
            secureTextEntry={item.secureTextEntry}
            onChangeText={(text) =>
              changeObjectState(userInfo, setUserInfo, item.feild, text)
            }>
            {userInfo[item.feild]}
          </TextInput>
        ))}
      </View>
      <View style={[styles.container, styles.profileControls]}>
        {editStatus ? (
          <>
            <View>
              <Button onPress={handleSubmitEdit}>Lưu thông tin</Button>
            </View>
            <View>
              <Button
                onPress={() => {
                  setUserInfo({
                    name: user.displayName,
                    email: user.email,
                  });
                  setEditStatus(false);
                }}>
                Huỷ thay đổi
              </Button>
            </View>
          </>
        ) : (
          <>
            <View>
              <Button onPress={() => setEditStatus(true)}>Sửa thông tin</Button>
            </View>
            <View>
              <Button onPress={handleSubmitLogout}>Đăng xuất</Button>
            </View>
          </>
        )}
      </View>
      <View style={[styles.container, styles.profileControls]}>
        <Button onPress={sendResetPassword}>Yêu cầu đặt lại mật khẩu</Button>
      </View>
    </>
  );
};

const Register = ({setRegisterStatus}) => {
  const {loggedIn, user, signIn, signOut, changeInfo, register} = useContext(
    AuthContext,
  );
  const [regInfo, setRegInfo] = useState({});
  const feilds = [
    {
      name: 'Tên',
      feild: 'name',
    },
    {
      name: 'Email',
      feild: 'email',
    },
    {
      name: 'Mật khẩu',
      feild: 'password',
      secureTextEntry: true,
    },
  ];
  const handleSubmitRegister = () => {
    const {name, email, password} = regInfo;
    if (!!name && !!email && !!password) {
      register(name, email, password);
    } else {
      console.log('Feild not meet requirement');
    }
  };
  return (
    <>
      <View>
        {feilds.map((item, index) => (
          <TextInput
            key={index}
            title={item.name}
            secureTextEntry={item.secureTextEntry}
            onChangeText={(text) =>
              changeObjectState(regInfo, setRegInfo, item.feild, text)
            }>
            {regInfo[item.feild]}
          </TextInput>
        ))}
      </View>
      <View style={[styles.container, styles.profileControls]}>
        <Button onPress={handleSubmitRegister}>Đăng kí tài khoản</Button>
        <Button onPress={() => setRegisterStatus(false)}>Đăng nhập</Button>
      </View>
    </>
  );
};
const ProfileInfo = () => {
  const {loggedIn, user, signIn, signOut, changeInfo} = useContext(AuthContext);
  const [registerStatus, setRegisterStatus] = useState(false);
  const image = require('../../../assets/images/profile.png');

  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <ProfileIndicatorLarge profile={{user, loggedIn, image}} />
      </View>
      <View>
        <View>
          <View>
            <View style={[styles.container, styles.headingContainer]}>
              <Text style={styles.infoHeading}>
                {loggedIn
                  ? 'Thông tin cá nhân'
                  : registerStatus
                  ? 'Đăng kí'
                  : 'Đăng nhập'}
              </Text>
            </View>
          </View>
          <>
            {loggedIn ? (
              <ViewAndEdit />
            ) : registerStatus ? (
              <Register setRegisterStatus={setRegisterStatus} />
            ) : (
              <LoginView setRegisterStatus={setRegisterStatus} />
            )}
          </>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  infoHeading: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  headingContainer: {
    marginVertical: 10,
  },
  profileControls: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
});
export default ProfileInfo;
