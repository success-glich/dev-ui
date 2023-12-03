type AuthErrorType = {
  name?: string;
  email?: string;
  password?: string;
};

type postErrorType = {
  title?: string;
  description?: string;
  image?: string;
};

interface PostType {
  id: number;
  user_id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  user: {
    name: string;
  };
}
