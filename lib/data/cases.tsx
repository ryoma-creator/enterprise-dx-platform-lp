import type { ElementType } from 'react'
import {
  FiClock, FiUsers, FiCalendar,
  FiTable, FiAlertCircle, FiUser, FiBarChart2,
  FiMonitor, FiTrendingUp, FiDatabase, FiSettings,
} from 'react-icons/fi'

export type CaseMetric = { label: string; value: string; unit: string }
export type CaseMeta   = { Icon: ElementType; label: string; value: string }

export type CaseData = {
  id: number
  category: string
  img: string
  title: string
  company: string
  description: string
  metrics: CaseMetric[]
  meta: CaseMeta[]
  heroMetrics: CaseMetric[]
  challenges: { Icon: ElementType; title: string; desc: string }[]
  approaches: { title: string; desc: string }[]
  flowSteps: string[]
  beforeAfter: { item: string; before: string; after: string }[]
  bigResult: { value: string; label: string }
  testimonial: { name: string; role: string; company: string; comment: string }
}

export const CASES: CaseData[] = [
  {
    id: 1,
    category: '製造業',
    img: '/images/case-manufacturing.png',
    title: '生産管理システムの刷新で\n業務効率を大幅に改善',
    company: '株式会社○○製作所 様',
    description: '老朽化した生産管理システムを刷新し、リアルタイムでの進捗管理とデータの可視化を実現。属人化していた業務を標準化し、生産性が大幅に向上しました。',
    metrics: [
      { label: '業務効率',    value: '40%',  unit: '改善' },
      { label: '導入期間',    value: '4',    unit: 'ヶ月' },
      { label: '年間コスト削減', value: '800', unit: '万円' },
    ],
    meta: [
      { Icon: FiClock,    label: '導入期間',  value: '4ヶ月' },
      { Icon: FiUsers,    label: '従業員規模', value: '120名' },
      { Icon: FiCalendar, label: '導入時期',  value: '2024年1月' },
    ],
    heroMetrics: [
      { label: '業務効率',     value: '40%',   unit: '改善' },
      { label: '年間コスト削減', value: '800万円', unit: '' },
      { label: '導入期間',     value: '4ヶ月',  unit: '' },
      { label: '投資回収期間',  value: '6ヶ月',  unit: '' },
    ],
    challenges: [
      { Icon: FiTable,       title: 'Excelでの属人化管理',  desc: '各担当者がExcelで個別管理しており、情報共有が困難' },
      { Icon: FiClock,       title: 'リアルタイム性の欠如', desc: '進捗状況の把握にタイムラグがあり、迅速な意思決定が困難' },
      { Icon: FiAlertCircle, title: '在庫の不正確さ',       desc: '手入力によるミスや更新漏れで在庫数のズレが頻発' },
      { Icon: FiUser,        title: '属人化の進行',         desc: '特定の担当者に業務が集中し不在時に業務が停滞' },
      { Icon: FiBarChart2,   title: 'データ活用の不足',     desc: 'データが分散し分析が困難で改善活動に活かせていない' },
    ],
    approaches: [
      { title: '業務プロセスの可視化・標準化', desc: '現状業務を分析し、最適な業務フローを設計' },
      { title: '生産管理システムの刷新',       desc: 'リアルタイムで進捗を把握できるシステムを構築' },
      { title: 'データ連携・自動化の実現',     desc: '各システムとの連携により手入力を大幅に削減' },
      { title: 'ダッシュボードによる可視化',   desc: '経営層も現場も使いやすいダッシュボードを提供' },
      { title: '運用定着支援',                desc: 'マニュアル整備や研修を通じて定着をサポート' },
    ],
    flowSteps: ['受注', '生産計画', '製造', '検査', '出荷'],
    beforeAfter: [
      { item: '進捗確認にかかる時間', before: '1日 約6時間',    after: '約30分' },
      { item: '月次集計にかかる時間', before: '約3日',          after: '即時' },
      { item: '在庫精度',           before: '約85%',           after: '99%以上' },
      { item: '人的作業の工数',      before: '月間 約120時間',   after: '月間 約30時間' },
      { item: 'データの活用',        before: '限定的',          after: 'リアルタイム分析が可能' },
    ],
    bigResult: { value: '75%', label: '業務時間削減' },
    testimonial: {
      name: '山田 太郎 様', role: '生産管理部 部長', company: '株式会社○○製作所',
      comment: 'システム導入前は、Excelでの管理や手作業が多く、ミスや確認漏れが頻発していました。NextGrowさんにシステムを構築いただき、リアルタイムでの進捗把握やデータ活用が可能になりました。現場の負担が大幅に減り、改善活動に集中できる環境が整いました。今後もさらなる効率化に向けて、伴走支援をお願いしたいと思っています。',
    },
  },
  {
    id: 2,
    category: 'EC・小売業',
    img: '/images/case-ec.png',
    title: 'ECサイトの構築・運用支援で\n売上を大きく伸長',
    company: '株式会社△商店 様',
    description: '戦略設計からサイト構築、集客施策までを一貫して支援。UI/UXの改善とマーケティング施策により、売上が150%向上しました。',
    metrics: [
      { label: '売上',    value: '150%', unit: '向上' },
      { label: '導入期間', value: '3',    unit: 'ヶ月' },
      { label: 'CVR',    value: '2.5',  unit: '倍' },
    ],
    meta: [
      { Icon: FiClock,    label: '導入期間',  value: '3ヶ月' },
      { Icon: FiUsers,    label: '従業員規模', value: '45名' },
      { Icon: FiCalendar, label: '導入時期',  value: '2024年4月' },
    ],
    heroMetrics: [
      { label: '売上向上',    value: '150%', unit: '' },
      { label: '導入期間',    value: '3ヶ月', unit: '' },
      { label: 'CVR改善',    value: '2.5倍', unit: '' },
      { label: '投資回収期間', value: '5ヶ月', unit: '' },
    ],
    challenges: [
      { Icon: FiMonitor,    title: '旧来サイトの使いにくさ', desc: 'UI/UXが古く、離脱率が高くコンバージョンに繋がらない' },
      { Icon: FiTrendingUp, title: '集客施策の不足',        desc: 'SNSや広告の活用が不十分で新規顧客の獲得が困難' },
      { Icon: FiDatabase,   title: '在庫・受注管理の非効率', desc: '手作業での管理が多くミスや対応遅延が頻発' },
      { Icon: FiBarChart2,  title: 'データ分析基盤の欠如',  desc: '購買データが活用できず施策の効果測定ができない' },
      { Icon: FiUser,       title: 'リピーター獲得の課題',  desc: 'One-to-Oneのコミュニケーションができていない' },
    ],
    approaches: [
      { title: 'ECサイトの全面リニューアル',      desc: 'ユーザー動線を見直し、購買体験を大幅に改善' },
      { title: 'デジタルマーケティング施策の実施', desc: 'SEO・SNS広告・メルマガを組み合わせた集客強化' },
      { title: '受注・在庫管理の自動化',          desc: 'システム連携で手作業を削減し、対応スピードを向上' },
      { title: 'データ分析基盤の構築',            desc: '購買データを可視化し、施策の効果を継続的に改善' },
      { title: 'CRMによるリピーター育成',         desc: '顧客セグメントに応じたパーソナライズ施策を展開' },
    ],
    flowSteps: ['集客', '商品閲覧', 'カート', '決済', 'リピート'],
    beforeAfter: [
      { item: '月間売上',        before: '約500万円',    after: '約1,250万円' },
      { item: 'コンバージョン率', before: '0.8%',        after: '2.0%' },
      { item: '新規顧客数',      before: '月間 約80名',  after: '月間 約240名' },
      { item: '広告費用対効果',   before: 'ROAS 180%',   after: 'ROAS 450%' },
      { item: 'リピート率',      before: '約15%',       after: '約38%' },
    ],
    bigResult: { value: '150%', label: '売上向上' },
    testimonial: {
      name: '鈴木 花子 様', role: '代表取締役', company: '株式会社△商店',
      comment: 'Webサイトのデザインから集客まで、全部自分たちでやるのは限界がありました。NextGrowさんに依頼してから、サイトがきれいになっただけでなく、お客様の声を聞きながら継続的に改善してもらえるので、月を追うごとに売上が伸びています。費用対効果が非常に高く、本当に頼んで良かったです。',
    },
  },
  {
    id: 3,
    category: 'サービス業',
    img: '/images/case-rpa.png',
    title: 'RPA導入による業務自動化で\n年間800万円のコスト削減',
    company: '株式会社□□サービス 様',
    description: '定型業務をRPAで自動化し、人的リソースをコア業務へシフト。ミスの削減と業務スピードの向上を実現しました。',
    metrics: [
      { label: '年間コスト削減', value: '800万円', unit: '' },
      { label: '削減工数',      value: '1,200',   unit: '時間' },
      { label: '導入期間',      value: '2',       unit: 'ヶ月' },
    ],
    meta: [
      { Icon: FiClock,    label: '導入期間',  value: '2ヶ月' },
      { Icon: FiUsers,    label: '従業員規模', value: '200名' },
      { Icon: FiCalendar, label: '導入時期',  value: '2024年6月' },
    ],
    heroMetrics: [
      { label: '年間コスト削減', value: '800万円',   unit: '' },
      { label: '削減工数',     value: '1,200時間', unit: '/年' },
      { label: '導入期間',     value: '2ヶ月',    unit: '' },
      { label: 'ミス削減率',   value: '95%',      unit: '' },
    ],
    challenges: [
      { Icon: FiTable,       title: '定型業務への工数過多',    desc: 'データ入力やファイル転記など単純作業に多くの時間を消費' },
      { Icon: FiAlertCircle, title: '人的ミスの多発',          desc: '手作業によるミスが顧客対応の品質に影響' },
      { Icon: FiUser,        title: 'コア業務への集中困難',    desc: '定型業務が多く、付加価値の高い業務に時間を割けない' },
      { Icon: FiClock,       title: '残業・休日出勤の常態化',  desc: '業務量の多さから長時間労働が常態化していた' },
      { Icon: FiSettings,    title: 'システム間連携の手作業',  desc: '複数システムへの二重入力が多くミスの温床になっていた' },
    ],
    approaches: [
      { title: '業務棚卸しと自動化優先度の整理', desc: '全業務を可視化し、RPAで自動化すべき業務を特定' },
      { title: 'RPAシナリオの設計・開発',        desc: '業務フローに沿ったロボットを開発・テスト' },
      { title: 'システム間連携の自動化',          desc: '複数システムをまたぐデータ連携を自動化' },
      { title: '例外処理・エラーハンドリング設計', desc: '例外が発生した場合の通知・対応フローを整備' },
      { title: '保守・運用体制の構築',            desc: 'ロボットの維持管理と定期見直しをサポート' },
    ],
    flowSteps: ['データ収集', '自動入力', '照合・検証', '出力', '通知'],
    beforeAfter: [
      { item: '月間残業時間',    before: '平均 約80時間/人', after: '平均 約20時間/人' },
      { item: 'データ入力ミス率', before: '約3%',           after: '約0.1%' },
      { item: '処理件数',        before: '月間 約2,000件',  after: '月間 約8,000件' },
      { item: '人件費相当コスト', before: '月間 約100万円',  after: '月間 約33万円' },
      { item: '担当者満足度',    before: '低（定型業務多）', after: '高（コア業務に集中）' },
    ],
    bigResult: { value: '95%', label: 'ミス削減率' },
    testimonial: {
      name: '田中 健一 様', role: '業務改善部 マネージャー', company: '株式会社□□サービス',
      comment: '以前は毎日残業が当たり前の状態で、社員のモチベーションにも影響が出ていました。RPAを導入してから、定型業務がほぼ自動化され、社員がよりクリエイティブな仕事に集中できるようになりました。導入後のサポートも手厚く、安心して任せられます。',
    },
  },
]
