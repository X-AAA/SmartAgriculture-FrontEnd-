import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home-page',
  imports: [RouterModule,CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {


  isMenuOpen = false;
  showAllBlogs = false;
  lastScrollTop = 0;


  allBlogs = [
    { icon: 'fa-tractor', title: '7 New Agriculture Technology Trends to Watch', date: 'April 11, 2025', link: 'https://www.fjdynamics.com/blog/industry-insights-65/new-agriculture-technology-342' },
    { icon: 'fa-seedling', title: 'Sustainable Farming Practices for Enhanced Profitability', date: 'April 21, 2025', link: 'https://agamerica.com/blog/how-sustainable-farming-practices-protect-land-and-profitability/' },
    { icon: 'fa-tint', title: 'Water Conservation Methods in Agriculture', date: 'May 2, 2025', link: 'https://canamek.ca/blogs/articles/water-conservation-in-agriculture/' },
    { icon: 'fa-network-wired', title: 'IoT in Agriculture: Smart Farming Technologies', date: 'April 11, 2025', link: 'https://www.digi.com/blog/post/iot-in-agriculture' },
    { icon: 'fa-microchip', title: 'Enhancing Precision Agriculture with  Technology', date: 'May 1, 2025', link: 'https://onsunnyslopefarm.com/enhancing-precision-agriculture-with-drone-technology/' },
    { icon: 'fa-building', title: 'Technological Innovations in Vertical Farming', date: 'August 27, 2024', link: 'https://www.vegbed.com/blogs/news/technological-innovations-in-vertical-farming-the-future-of-agriculture' },
    { icon: 'fa-microscope', title: 'Advanced Soil Health Monitoring Technologies', date: 'January 25, 2025', link: 'https://thefarminginsider.com/advanced-soil-health-monitoring/' },
    { icon: 'fa-brain', title: 'AI-Powered Crop Disease Detection', date: 'February 10, 2025', link: 'https://flypix.ai/blog/crop-disease-detection/' }
  ];

  get visibleBlogs() {
    return this.showAllBlogs ? this.allBlogs : this.allBlogs.slice(0, 4);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.classList.toggle('menu-open', this.isMenuOpen);
  }

  closeMenu() {
    this.isMenuOpen = false;
    document.body.classList.remove('menu-open');
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.getElementById('mainHeader');
    if (header) {
      header.classList.toggle('header-hidden', scrollTop > this.lastScrollTop && scrollTop > 100);
    }
    this.lastScrollTop = scrollTop;
  }


}
