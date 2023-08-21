export interface Blog {
  id: number;
  title: string;
  body: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewBlog {
  title: string;
  body: string;
  image: string | null;
  // author: string | null;
}
