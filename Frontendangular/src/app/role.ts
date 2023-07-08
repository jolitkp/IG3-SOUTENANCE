export class Role {
  id: number = 0;
  // name: string ='';
  permissions: string[]=[];
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  // allPermissions: string[]=[];
  roleName: string='';


  constructor(data?: Partial<Role>){
    if (data){
      Object.assign(this, data)
    }
  }
}
