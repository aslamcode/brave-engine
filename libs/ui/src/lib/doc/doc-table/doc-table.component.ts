import { Component, OnInit } from '@angular/core';
import { IPaginator } from '../../paginator/paginator.component';

@Component({
  selector: 'ui-doc-table',
  templateUrl: './doc-table.component.html',
  styleUrls: ['./doc-table.component.scss'],
})
export class DocTableComponent implements OnInit {

  columns: string[] = ['position', 'weight', 'symbol'];
  data: any;

  constructor() { }

  ngOnInit() {
    this.loadTableData();
  }

  loadTableData() {
    // Use delay to check table working dynamically
    setTimeout(() => {
      this.data = [
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', category: '1', bold: true },
        {
          position: 'SUB ITENS', name: '', weight: 4.0026, symbol: 'He', category: '1', childs: [
            { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', category: '2' },
            { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', category: '2' },
            { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
            { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
          ]
        },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', category: '1' },
        { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
        { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
        { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
        { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', category: '2' },
        { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', category: '2' },
        { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', category: '2' },
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', category: '1', bold: true },
        {
          position: 'SUB ITENS', name: '', weight: 4.0026, symbol: 'He', category: '1', childs: [
            { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', category: '2' },
            { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', category: '2' },
            { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
            { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
          ]
        },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', category: '1' },
        { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
        { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
        { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
        { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', category: '2' },
        { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', category: '2' },
        { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', category: '2' },
        { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', category: '1', bold: true },
        {
          position: 'SUB ITENS', name: '', weight: 4.0026, symbol: 'He', category: '1', childs: [
            { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', category: '2' },
            { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', category: '2' },
            { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
            { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
          ]
        },
        { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', category: '1' },
        { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
        { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
        { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
        { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
        { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', category: '2' },
        { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', category: '2' },
        { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', category: '2' },
      ];

      setTimeout(() => {
        this.columns = ['position', 'name', 'weight', 'symbol'];
      }, 2000);
    }, 2000);
  }

  sortChange(data: any) {
    console.log('sort data', data);
  }

  paginatorChange(data: IPaginator) {
    console.log(data);
  }
}
