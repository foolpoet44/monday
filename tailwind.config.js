/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0F1117',      // 앱 전체 배경
          surface: '#1C1F2E',   // 카드, 사이드바
          elevated: '#252839',  // 모달, 드롭다운
        },
        border: {
          DEFAULT: '#2D3148',
          focus: '#4F6EF7',
        },
        text: {
          primary: '#E8EAF0',
          secondary: '#8B90A7',
          muted: '#4B5170',
        },
        accent: '#4F6EF7',      // 버튼, 활성 상태
        priority: {
          p1: '#F75F5F',        // 빨강 (High)
          p2: '#F7A74F',        // 주황 (Medium)
          p3: '#4FD6A6',        // 그린 (Low)
        },
        status: {
          todo: '#8B90A7',
          in_progress: '#4F6EF7',
          blocked: '#F75F5F',
          done: '#4B5170',
        },
        due: {
          overdue: '#F75F5F',   // 마감 초과
          today: '#F7A74F',     // 오늘
          tomorrow: '#F7C94F',  // 내일
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
