// This file is an example within this folder,
// create new file for each by categories ----

interface Meta {
  pageSize: number;
  currentPage: number;
  total: number;
  totalPage: number;
}

export interface HttpResponse<T> {
  request_id: number;
  status_desc: string;
  data?: T;
  meta?: Meta;
}
