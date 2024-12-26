<template>
  <div id="container">
    <header class="app-header" :class="{ 'scrolled': isScrolled }">
      <div class="header-left">
        <div class="logo">
          <a href="/#/">
            <font-awesome-icon :icon="['fas', 'ticket']" style="height: 100%; color: #E50914;" />
          </a>
        </div>
        <nav class="nav-links desktop-nav">
          <ul>
            <li><a href="/#/">홈</a></li>
            <li><a href="/#/search">찾아보기</a></li>
            <li><a href="/#/wishlist">내가 찜한 리스트</a></li>
          </ul>
        </nav>
      </div>
      <div class="header-right">
        <span v-if="isAuthenticated && profileName !== 'Guest'" class="profile-name">{{ profileName }}</span>
        <button class="icon-button" @click="toggleMenu">
          <font-awesome-icon :icon="['fas', 'user']" />
        </button>
        <!-- 드롭다운 메뉴 -->
        <div class="dropdown-menu" v-if="showMenu">
          <button v-if="isAuthenticated && profileName !== 'Guest'" @click="logout">로그아웃</button>
          <button v-else @click="login">로그인</button>
        </div>
        <button class="icon-button mobile-menu-button" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>

    </header>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ 'open': isMobileMenuOpen }">
      <button class="close-button" @click="toggleMobileMenu">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
      <nav>
        <ul>
          <li><a href="/#/" @click="toggleMobileMenu">홈</a></li>
          <li><a href="/#/popular" @click="toggleMobileMenu">대세 콘텐츠</a></li>
          <li><a href="/#/search" @click="toggleMobileMenu">찾아보기</a></li>
          <li><a href="/#/wishlist" @click="toggleMobileMenu">내가 찜한 리스트</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faUser, faTicket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSearch, faUser, faTicket, faBars, faTimes);

export default {
  name: 'MainHeader',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      showMenu: false, // 드롭다운 메뉴 표시 여부
      profileName: '', // 사용자 이름 저장
      isAuthenticated: false, // 로그인 상태
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu; // 드롭다운 메뉴 토글
    },
    logout() {
      console.log('Logging out...');
      // 로컬 저장소 데이터 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('profileName');

      // 상태 초기화
      this.isAuthenticated = false;
      this.profileName = 'Guest';
      this.showMenu = false;

      console.log('After logout - localStorage:', localStorage.getItem('accessToken'), localStorage.getItem('profileName'));
      console.log('Redirecting to SignIn...');

      // SignIn 페이지로 리디렉션
      this.$router.push({ name: 'SignIn' }).catch(err => console.error('Routing error:', err));
    },
    login() {
      console.log('Redirecting to SignIn...');
      this.showMenu = false;
      this.$router.push({ name: 'SignIn' }).catch(err => console.error('Routing error:', err));
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50; // 스크롤 여부에 따라 헤더 스타일 변경
    },
  },


  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    const token = localStorage.getItem('accessToken');
    const profileName = localStorage.getItem('profileName') || 'Guest';

    this.isAuthenticated = !!token; // 토큰이 존재하면 로그인 상태
    this.profileName = token ? profileName : 'Guest';

    console.log('Mounted - isAuthenticated:', this.isAuthenticated);
    console.log('Mounted - profileName:', this.profileName);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style>
.profile-name {
  margin-right: 10px;
  color: white;
  font-size: 1rem;
}

.app-header {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 4%;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.app-header:hover,
.app-header.scrolled {
  background-color: #141414;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.logo {
  height: 30px;
  margin-right: 25px;
  justify-items: center;
  align-items: center;
}

.nav-links ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #b3b3b3;
}

.icon-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  margin-left: 20px;
  cursor: pointer;
}

.icon-button:hover {
  opacity: 0.5;
}

.mobile-menu-button {
  display: none;
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  right: -100%;
  width: 50%;
  height: 100%;
  background-color: #141414;
  z-index: 1001;
  transition: right 0.3s ease;
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav ul {
  list-style-type: none;
  padding: 0;
  margin-top: 60px;
}

.mobile-nav li {
  margin: 20px 0;
}

.mobile-nav a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 1.2rem;
  display: block;
  padding: 10px 20px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-nav {
    display: block;
  }

  .icon-button {
    font-size: 0.75rem;
    margin-left: 10px;
  }

  a {
    text-align: left;
    font-size: 1.15rem !important;
  }


}

.dropdown-menu {
  position: absolute;
  top: 50px;
  right: 10px;
  background-color: #141414;
  border: 1px solid #333;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}

.dropdown-menu button {
  background: none;
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.dropdown-menu button:hover {
  background-color: #333;
}



</style>
