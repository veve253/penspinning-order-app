# ペン回し練習室

## サービス概要

ペン回しのコンボ、フリースタイルをメモするツール

- コンボ…複数のペン回しの技を組み合わせたもの
- フリースタイル…複数の技・コンボを組み合わせた一連の流れ
  - ペン回し愛好家の間で主流の楽しみ方

## 機能

### ログイン時・非ログイン時両方で使える機能

#### ペン回しのコンボ・フリースタイルをメモ

- 練習したいコンボ・フリースタイルを構成する技をメモ
  (※非ログイン時は、データベースへの記録はされない)
- 技は編集・削除が可能

<img width="800" alt="スクリーンショット 2024-02-29 18 25 16" src="https://github.com/veve253/penspinning-order-app/assets/135543052/a533816d-58ce-47bf-8d93-8ea9fcb3b614">
<img width="200" alt="スクリーンショット 2024-02-29 18 25 58" src="https://github.com/veve253/penspinning-order-app/assets/135543052/b189af7a-6b83-4156-a072-483c56fe704a">

#### ドラッグ&ドロップによる技の並べ替え

- ライブラリは dnd-kit を使用

![D_D](https://github.com/veve253/penspinning-order-app/assets/135543052/79fe9f95-3b5a-43cc-b730-ca16b16d661b)

### ログイン時のみ使える機能

#### 複数のコンボ・フリースタイルを記録

- 複数のコンボ・フリースタイルを記録することができる
- コンボ・コンボ名は編集、削除が可能

<img width="800" alt="スクリーンショット 2024-02-29 20 29 09" src="https://github.com/veve253/penspinning-order-app/assets/135543052/f50f3959-e723-430a-aa0d-68c038c6eaec">
<img width="200" alt="スクリーンショット 2024-02-29 20 30 29" src="https://github.com/veve253/penspinning-order-app/assets/135543052/75d7cd45-a306-462c-bd0d-0e53ea147e4e">

## 使用技術

### フロントエンド

- TypeScript 5.0.2
- React 18.2.0

### バックエンド

- Firebase 10.6.0

### データベース

- Cloud Firestore

### 認証

- Firebase-Authentication
