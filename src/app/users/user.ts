export class User {
  _id: String;
  salt: String;
  displayName: String;
  provider: "local";
  username: String;
  created: {
      $date: Date;
  };
  roles: Array<String>;
  profileImageURL: String;
  password: String;
  email: String;
  phone: {
    mobile: String,
    work: String
  };
  name: String;
  __v: 0
}
