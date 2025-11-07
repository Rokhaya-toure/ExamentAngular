import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Article {
  nom: string;
  quantite: number;
  prixUnitaire: number;
  montant: number;
}

export interface Approvisionnement {
  reference: string;
  date: string;
  fournisseur: string;
  articles: Article[];
  montantTotal: number;
  statut: 'Reçu' | 'En attente';
  observations?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApprovisionnementService {
  private approvisionnements: Approvisionnement[] = [
    {
      reference: 'APP-2023-001',
      date: '15/04/2023',
      fournisseur: 'Textiles Dakar SARL',
      articles: [
        { nom: 'Article 1', quantite: 100, prixUnitaire: 2500, montant: 250000 },
        { nom: 'Article 2', quantite: 200, prixUnitaire: 2500, montant: 500000 }
      ],
      montantTotal: 750000,
      statut: 'Reçu'
    },
    {
      reference: 'APP-2023-002',
      date: '10/04/2023',
      fournisseur: 'Mercerie Centrale',
      articles: [
        { nom: 'Article 3', quantite: 150, prixUnitaire: 2133, montant: 320000 }
      ],
      montantTotal: 320000,
      statut: 'Reçu'
    },
    {
      reference: 'APP-2023-003',
      date: '05/04/2023',
      fournisseur: 'Tissus Premium',
      articles: [
        { nom: 'Article 4', quantite: 180, prixUnitaire: 2500, montant: 450000 }
      ],
      montantTotal: 450000,
      statut: 'En attente'
    },
    {
      reference: 'APP-2023-004',
      date: '01/04/2023',
      fournisseur: 'Textiles Dakar SARL',
      articles: [
        { nom: 'Article 5', quantite: 272, prixUnitaire: 2500, montant: 680000 }
      ],
      montantTotal: 680000,
      statut: 'Reçu'
    },
    {
      reference: 'APP-2023-005',
      date: '25/03/2023',
      fournisseur: 'Mercerie Centrale',
      articles: [
        { nom: 'Article 6', quantite: 208, prixUnitaire: 2500, montant: 520000 }
      ],
      montantTotal: 520000,
      statut: 'Reçu'
    },
    {
      reference: 'APP-2023-006',
      date: '25/03/2023',
      fournisseur: 'Mercerie Centrale',
      articles: [
        { nom: 'Article 7', quantite: 208, prixUnitaire: 2500, montant: 520000 }
      ],
      montantTotal: 450000,
      statut: 'Reçu'
    }
  ];

  private approvisionnementSubject = new BehaviorSubject<Approvisionnement[]>(this.approvisionnements);
  public approvisionnements$ = this.approvisionnementSubject.asObservable();

  private fournisseurs = [
    'Textiles Dakar SARL',
    'Mercerie Centrale',
    'Tissus Premium'
  ];

  constructor() {}

  getApprovisionnements(): Observable<Approvisionnement[]> {
    return this.approvisionnements$;
  }

  getAllApprovisionnements(): Approvisionnement[] {
    return this.approvisionnements;
  }

  getFournisseurs(): string[] {
    return this.fournisseurs;
  }

  addApprovisionnement(appro: Approvisionnement): void {
    this.approvisionnements.unshift(appro);
    this.approvisionnementSubject.next(this.approvisionnements);
  }

  generateReference(): string {
    const year = new Date().getFullYear();
    const count = this.approvisionnements.length + 1;
    return `APP-${year}-${String(count).padStart(3, '0')}`;
  }

  getStatistiques() {
    const total = this.approvisionnements.reduce((sum, app) => sum + app.montantTotal, 0);
    const nombre = this.approvisionnements.length;
    
    // Calculer le fournisseur principal
    const fournisseurCounts: { [key: string]: number } = {};
    this.approvisionnements.forEach(app => {
      fournisseurCounts[app.fournisseur] = (fournisseurCounts[app.fournisseur] || 0) + app.montantTotal;
    });
    
    let fournisseurPrincipal = '';
    let maxMontant = 0;
    Object.keys(fournisseurCounts).forEach(fournisseur => {
      if (fournisseurCounts[fournisseur] > maxMontant) {
        maxMontant = fournisseurCounts[fournisseur];
        fournisseurPrincipal = fournisseur;
      }
    });
    
    const pourcentage = total > 0 ? ((maxMontant / total) * 100).toFixed(1) : '0';
    
    return {
      total,
      nombre,
      fournisseurPrincipal,
      fournisseurMontant: maxMontant,
      pourcentage
    };
  }
}