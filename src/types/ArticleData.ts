import { Tag } from "./tag"
export declare interface ArticleData {
  title: string;
  tags: Array<Tag>;
  visited?: Number;
  digest: string;
  _id?: string;
  content?: string;
}
