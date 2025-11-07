import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApprovisionnementService, Article, Approvisionnement } from '../../../services/approvisionnement.service';

@Component({
  selector: 'app-create-approvisionnement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-approvisionnements.component.html'
})
export class CreateApprovisionnementsComponent implements OnInit {
  dateApprovisionnement: string = '';
  fournisseurSelectionne: string = '';
  reference: string = '';
  observations: string = '';
  
  fournisseurs: string[] = [];
  articles: Article[] = [];
  
  articleSelectionne: string = '';
  quantite: number = 0;
  prixUnitaire: number = 0;

  constructor(
    private approvisionnementService: ApprovisionnementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fournisseurs = this.approvisionnementService.getFournisseurs();
    this.reference = this.approvisionnementService.generateReference();
    
    // Date par défaut (aujourd'hui)
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    this.dateApprovisionnement = `${year}-${month}-${day}`;
  }

  ajouterArticle(): void {
    if (this.articleSelectionne && this.quantite > 0 && this.prixUnitaire > 0) {
      const montant = this.quantite * this.prixUnitaire;
      this.articles.push({
        nom: this.articleSelectionne,
        quantite: this.quantite,
        prixUnitaire: this.prixUnitaire,
        montant: montant
      });
      
      // Réinitialiser les champs
      this.articleSelectionne = '';
      this.quantite = 0;
      this.prixUnitaire = 0;
    }
  }

  supprimerArticle(index: number): void {
    this.articles.splice(index, 1);
  }

  getMontantTotal(): number {
    return this.articles.reduce((sum, article) => sum + article.montant, 0);
  }

  enregistrerApprovisionnement(): void {
    if (this.dateApprovisionnement && this.fournisseurSelectionne && this.articles.length > 0) {
      // Convertir la date au format dd/mm/yyyy
      const [year, month, day] = this.dateApprovisionnement.split('-');
      const dateFormatee = `${day}/${month}/${year}`;
      
      const nouvelApprovisionnement: Approvisionnement = {
        reference: this.reference,
        date: dateFormatee,
        fournisseur: this.fournisseurSelectionne,
        articles: this.articles,
        montantTotal: this.getMontantTotal(),
        statut: 'En attente',
        observations: this.observations
      };
      
      this.approvisionnementService.addApprovisionnement(nouvelApprovisionnement);
      this.router.navigate(['/approvisionnements']);
    }
  }

  annuler(): void {
    this.router.navigate(['/approvisionnements']);
  }

  retourListe(): void {
    this.router.navigate(['/approvisionnements']);
  }
}