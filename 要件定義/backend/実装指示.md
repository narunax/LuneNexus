# **VSCode AI 実装指示：易経データ駆動型リプレイス**

以下の指示をCursorやCopilot Chat等のAIエディタに入力し、既存サイトをデータ駆動型に改修してください。

## **指示内容**

既存の易経診断サイトのバックエンドを、外部JSONファイルを動的に読み込むアーキテクチャに改修してください。

### **1\. データ取得とマッピング**

* 占いロジックによって算出された「卦番号 (1-64)」と「ジャンルボタンの選択」を引数に受け取ります。  
* パス /data/iching/hexagram\_{id}.json からデータをfetchしてください。  
* ユーザーが選択したジャンル（「流れ・好機」「仕事・対人」「自己・精神」「基盤・環境」）に応じて、JSON内の diagnoses オブジェクトから該当するキー（time\_and\_mandate, virtue\_and\_conduct, contemplation\_and\_cultivation, field\_and\_foundation）のデータを抽出して表示してください。

### **2\. UIコンポーネントの構築要件**

* **卦の属性テーブル**: trigrams の upper と lower に含まれる nature, element, direction, animal 等を、PDFのUI通りに表形式で表示してください。  
* **インスピレーション・セクション**: inspiration.keywords をタグ形式で並べ、inspiration.visual\_note を引用スタイルで表示してください。  
* **爻の解釈**: 配列 lines から、指定されたインデックスの meaning, advice, affirmation を抽出し、個別のカードとして表示してください。  
* **アファメーションの強調**: 各診断カテゴリおよび各爻に含まれる affirmation を、デザイン上最も目立つ形式（中央揃え、枠線付き等）で配置してください。

### **3\. ロジックの正確性**

* 爻（Line）の番号は、易経の伝統に従い「下から上（初爻〜上爻）」ですが、JSON配列は 0 インデックスから始まっていることに注意してマッピングしてください。