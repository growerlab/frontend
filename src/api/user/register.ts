import client from '../graphql/client';
import { gql, ApolloError } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

export const rule = {
  pwdMinLength: 8,
  pwdMaxLength: 32,
  usernameMinLength: 4,
  usernameMaxLength: 40,
};

export const passwordRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/s;
export const usernameRegex = /^[a-zA-Z0-9_-]+$/s;

const GQL_REGISTER = gql`
  mutation registerUser($input: InputUserPayload!) {
    user {
      name
      email
      username
      verified_at
    }
  }
`;

interface SaveUser {
  name: string;
  email: string;
  username: string;
  verified_at: Date;
}

interface InputUserPayload {
  email: string;
  username: string;
  password: string;
}

class Register {
  payload: InputUserPayload;

  constructor(payload: InputUserPayload) {
    this.payload = payload;
  }

  public exec(): void {
    const [gqlRegister, { error, data }] = useMutation<
      { user: SaveUser },
      { input: InputUserPayload }
    >(GQL_REGISTER, {
      onCompleted: (data: any) => void {},
      onError: (error: ApolloError) => void {},
    });

    gqlRegister({
      variables: {
        input: this.payload,
      },
    });
  }

  public validate(): Boolean {
    if (!Register.validPassword(this.payload.password)) {
      return false;
    }
    if (!Register.validUsername(this.payload.username)) {
      return false;
    }
    return true;
  }

  static validPassword(value: String): Boolean {
    if (value.length < rule.pwdMinLength || value.length > rule.pwdMaxLength) {
      return false;
    }
    if (!passwordRegex.test(value.toString())) {
      return false;
    }
    return true;
  }

  static validUsername(value: String): Boolean {
    if (value.length < rule.usernameMinLength || value.length > rule.usernameMaxLength) {
      return false;
    }
    if (!usernameRegex.test(value.toString())) {
      return false;
    }
    return true;
  }
}

export default Register;
