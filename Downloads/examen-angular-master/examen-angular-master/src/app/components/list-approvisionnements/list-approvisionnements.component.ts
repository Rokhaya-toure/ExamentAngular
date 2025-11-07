import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApprovisionnementService, Approvisionnement } from '../../../services/approvisionnement.service';

@Component({
  selector: 'app-list-approvisionnements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-approvisionnements.component.html'
})
export class ListApprovisionnementsComponent implements OnInit {
  approvisionnements: Approvisionnement[] = [];
  approvisionnementsFiltres: Approvisionnement[] = [];
  
  // Filtres
  searchTerm: string = '';
  fournisseurFiltre: string = '';
  articleFiltre: string = '';
  dateDebut: string = '';
  dateFin: string = '';
  triDate: string = 'recent';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  paginatedData: Approvisionnement[] = [];
  
  // Statistiques
  statistiques = {
    total: 0,
    nombre: 0,
    fournisseurPrincipal: '',
    fournisseurMontant: 0,
    pourcentage: '0'
  };

  fournisseurs: string[] = [];

  constructor(
    private approvisionnementService: ApprovisionnementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.approvisionnementService.approvisionnements$.subscribe(data => {
      this.approvisionnements = data;
      this.appliquerFiltres();
      this.calculerStatistiques();
    });
    
    this.fournisseurs = this.approvisionnementService.getFournisseurs();
    
    // Initialiser les dates par défaut
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 6);
    
    this.dateDebut = this.formatDateForInput(sixMonthsAgo);
    this.dateFin = this.formatDateForInput(today);
  }

  formatDateForInput(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  appliquerFiltres(): void {
    let filtres = [...this.approvisionnements];
    
    // Filtre par recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtres = filtres.filter(app => 
        app.reference.toLowerCase().includes(term) ||
        app.fournisseur.toLowerCase().includes(term)
      );
    }
    
    // Filtre par fournisseur
    if (this.fournisseurFiltre) {
      filtres = filtres.filter(app => app.fournisseur === this.fournisseurFiltre);
    }
    
    // Tri par date
    if (this.triDate === 'recent') {
      filtres.sort((a, b) => this.compareDates(b.date, a.date));
    } else {
      filtres.sort((a, b) => this.compareDates(a.date, b.date));
    }
    
    this.approvisionnementsFiltres = filtres;
    this.totalPages = Math.ceil(filtres.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  compareDates(date1: string, date2: string): number {
    const [d1, m1, y1] = date1.split('/').map(Number);
    const [d2, m2, y2] = date2.split('/').map(Number);
    const dt1 = new Date(y1, m1 - 1, d1);
    const dt2 = new Date(y2, m2 - 1, d2);
    return dt1.getTime() - dt2.getTime();
  }

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.approvisionnementsFiltres.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  reinitialiserFiltres(): void {
    this.searchTerm = '';
    this.fournisseurFiltre = '';
    this.articleFiltre = '';
    this.triDate = 'recent';
    this.appliquerFiltres();
  }

  calculerStatistiques(): void {
    this.statistiques = this.approvisionnementService.getStatistiques();
  }

  getNombreArticles(approvisionnement: Approvisionnement): number {
    return approvisionnement.articles.length;
  }

  nouvelApprovisionnement(): void {
    this.router.navigate(['/approvisionnements/nouveau']);
  }

  voirDetails(reference: string): void {
    // Pour l'instant, juste un log
    console.log('Voir détails de:', reference);
  }

  editer(reference: string): void {
    // Pour l'instant, juste un log
    console.log('Éditer:', reference);
  }

  supprimer(reference: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet approvisionnement ?')) {
      // Logique de suppression à implémenter
      console.log('Supprimer:', reference);
    }
  }
}