import { Injectable } from '@angular/core';
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { FileUpload } from '../models/file-upload.model';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HandleImagesService {
  imageDetailList: AngularFireList<any>;
  private basePath = '/uploads';


  getFileStorage = getStorage();
  listRef = ref(this.getFileStorage, this.basePath);
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private http: HttpClient) { }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  async getImageDetailList(): Promise<any> {
    let results = []
    await listAll(this.listRef)
    .then((res) => {
    res.items.forEach(async (itemRef) => {
      // All the items under listRef.
    const forestRef = ref(this.getFileStorage, `${this.basePath}/${itemRef['name']}`);
    await getDownloadURL(forestRef)
    .then((url) => {
      results.push(url)

    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
  });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
  return results

  }

  getConfigResponse(): Observable<any> {
    return this.http.get<any>('https://docs-examples.firebaseio.com/fireblog/posts.json');
  }
}
