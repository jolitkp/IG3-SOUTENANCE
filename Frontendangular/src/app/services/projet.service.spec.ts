// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { ProjetService } from './projet.service';

// describe('ProjetService', () => {
//   let service: ProjetService;
//   let httpMock: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [ProjetService]
//     });

//     service = TestBed.inject(ProjetService);
//     httpMock = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpMock.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();};
//     const projectId = 1;

//     service.getProjetById(projectId).subscribe((project: any) => {
//       expect(project).toEqual(mockProject);
//     });
//   });

//   it('should retrieve a project by ID', () => {
//     const mockProject = { id: 1, name: 'Project 1' 

//     const req = httpMock.expectOne(`/projets/${projectId}`);
//     expect(req.request.method).toBe('GET');
//     req.flush(mockProject);
//   });

//   it('should create a new project', () => {
//     const newProject = { name: 'New Project' };

//     service.createProjet(newProject).subscribe((response: any) => {
//       expect(response).toBeTruthy();
//     });

//     const req = httpMock.expectOne('/projets');
//     expect(req.request.method).toBe('POST');
//     req.flush({});
//   });

//   it('should update an existing project', () => {
//     const updatedProject = { id: 1, name: 'Updated Project' };
//     const projectId = 1;

//     service.updateProjet(projectId, updatedProject).subscribe((response: any) => {
//       expect(response).toBeTruthy();
//     });

//     const req = httpMock.expectOne(`/projets/${projectId}`);
//     expect(req.request.method).toBe('PUT');
//     req.flush({});
//   });

//   it('should delete a project', () => {
//     const projectId = 1;

//     service.deleteProjet(projectId).subscribe((response: any) => {
//       expect(response).toBeTruthy();
//     });

//     const req = httpMock.expectOne(`/projets/${projectId}`);
//     expect(req.request.method).toBe('DELETE');
//     req.flush({});
//   });

// });
