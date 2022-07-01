 exports.createPagination = function (pagination, options) {
   if (!pagination ||  pagination.limit <= 1) {
     return '';
   }
 
   var limit = pagination.limit;

   var aux_limit = pagination.limit;
 
 
   var n;
   var queryParams = '';
   var page = pagination.page;
   page = parseInt(page)
   var leftText = '<span aria-hidden="true">&laquo;</span>'
   var rightText = '<span aria-hidden="true">&raquo;</span>'
   var pageCount = Math.ceil(pagination.totalRows / pagination.limit);
 
   var firstText = 'A';
   var lastText = 'Ω';
 
   var template = '<ul class="px-2 pagination not-overflow-text">';

    // ========= First Button ===============
    if (page != 1) {
        template = template + '<li class="page-item"><a class="page-link" href="?page=1">' + firstText  + '</a></li>';
    }

   // ========= Previous Button ===============
   if (page != 1) {
     if (page <= 1) {
       n = 1;
     } else {
       n = page - 1;
     }
     template = template + '<li class="page-item"><a class="page-link" href="?page=' + n + queryParams + '">' + leftText + '</a></li>';
   }
 
   // next button
    if (page < aux_limit) {
      n = page + 1;
      template = template + '<li class="page-item"><a class="page-link" href="?page=' + n + queryParams + '">' + rightText + '</a></li>';
    }
    // ========= Last Button ===============
    if (page != aux_limit) {
      template = template + '<li class="page-item"><a class="page-link" href="?page=' + aux_limit + '">' + lastText + '</a></li>';
  }

  template = template + '</ul>';
  return template;
 };