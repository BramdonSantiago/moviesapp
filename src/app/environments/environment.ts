import { HttpHeaders } from '@angular/common/http';
const bearerToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzE3Mzg0NGRlNTE0OTYxMjFiOGUxYTkxNDhlOTc4ZSIsIm5iZiI6MTc2MTg1MjExNi40Miwic3ViIjoiNjkwM2JhZDQ0MWM4M2U2M2JiNzM2NTYzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.MtjnatBCeOf2hVsdMiIWDo4NdXAq7_LG_SqMHJjcxA8';

export const environment = {
    production: true,
    apiUrl: 'https://api.themoviedb.org/3',
    debug: true,
    headers: {
        Authorization: `Bearer ${bearerToken}`,
        accept: 'application/json'
    }
};
