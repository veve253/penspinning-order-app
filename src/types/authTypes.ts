import firebase from "firebase/app";
import { User } from "firebase/auth";

// useAuthState の戻り値の型定義
export type AuthState = {
  user: User | null | undefined; // ユーザー情報またはnull
  loading: boolean; // 読み込み中かどうか
  error: Error | undefined; // エラー情報またはnull
};
