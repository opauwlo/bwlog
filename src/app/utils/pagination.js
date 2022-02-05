 exports.createPagination = function (pagination, options) {
   if (!pagination ||  pagination.limit <= 1) {
     return '';
   }
 
   var limit = pagination.limit;
   var aux_limit = pagination.limit;
 
   if (limit > 7) {
     limit = 2
   }
 
 
   var n;
   var queryParams = '';
   var page = pagination.page;
   page = parseInt(page)
   var rightText = '<span aria-hidden="true">&raquo;</span>'
   var leftText = '<span aria-hidden="true">&laquo;</span>'
   var pageCount = Math.ceil(pagination.totalRows / pagination.limit);
 
   var firstText = 'First';
   var lastText = 'Last';
 
   var template = '<ul class="position-fixed bottom-0 start-50 translate-middle-x pagination mt-5">';

    // ========= First Button ===============
    if (page === 1) {
      template = template + '<li class="page-item disabled"><a class="page-link" href="?page=1' + queryParams + '">' + firstText + '</a></li>';
  } else {
      template = template + '<li class="page-item"><a class="page-link" href="?page=1' + queryParams + '">' + firstText + '</a></li>';
  }

   // ========= Previous Button ===============
   if (page === 1) {
     n = 1;
     template = template + '<li class="page-item disabled"><a class="page-link" href="?page=' + n + queryParams + '">' + leftText + '</a></li>';
   } else {
     if (page <= 1) {
       n = 1;
     } else {
       n = page - 1;
     }
     template = template + '<li class="page-item"><a class="page-link" href="?page=' + n + queryParams + '">' + leftText + '</a></li>';
   }
 
   // ========= Page Numbers Middle ======
 
   var i = 0;
   var leftCount = Math.ceil(limit / 2) - 1;
   var rightCount = limit - leftCount - 1;
   if (page + rightCount > pageCount) {
     leftCount = limit - (pageCount - page) - 1;
   }
   if (page - leftCount < 1) {
     leftCount = page - 1;
   }
   var start = page;
 
   while (i <= limit) {
     n = start;
     if (n > aux_limit) {
       break
     }
     if (start === page) {
       template = template + '<li class="page-item active"><a class="page-link" href="?page=' + n + queryParams + '">' + n + '</a></li>';
     } else {
       template = template + '<li class="page-item" ><a class="page-link" href="?page=' + n + queryParams + '">' + n + '</a></li>';
     }
 
     start++;
     i++;
   }
 

    // ========= Last Button ===============
    if (page == aux_limit) {
      template = template + '<li class="page-item disabled"><a class="page-link" href="?page=' + pageCount + queryParams + '">' + lastText + '</a></li>';
  } else {
      template = template + '<li class="page-item"><a class="page-link" href="?page=' + aux_limit + '">' + lastText + '</a></li>';
  }

  template = template + '</ul>';
  return template;
 };