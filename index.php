<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css" />
    <title>Document</title>
  </head>

  <body>

      <div class="container mt-4">
          <!--online users -->
          <p>online users:<?php 
            $host="localhost";
            $user="root";
            $pass="";
            $db="articles";
            
            try{
                $DBH=new pdo("mysql:host=$host;dbname=$db", $user,$pass);
            }catch(PDOException $e){
                echo "Not Connected...".$e->getMessage();
            }
            
            $ip = $_SERVER['REMOTE_ADDR'];
            
            
            $sql="SELECT ip FROM visitors WHERE ip='$ip'";
            $Check=$DBH->prepare($sql);
            $Check->execute();
            $CheckIp=$Check->rowCount();
            
            if($CheckIp==0) {
                $query="INSERT INTO visitors(id,ip) VALUES(NULL, '$ip')";
                $insertIp=$DBH->prepare($query);
                $insertIp->execute();
            }
            $number=$DBH->prepare("SELECT ip FROM visitors");
            $number->execute();
            $visitor=$number->rowCount();
            echo $visitor;
            ?></p>

            <!-- end online users -->

          <!--yellow articles-->
          <div class="titlebutton">
          <p><span class="title">Articles</span></p>

<!-- Modal Form-->
    <!-- Modal Button-->
              <button id="modalBtn" class="button"> + Create new</button>
          </div>

    <div id="simpleModal" class="modal">
      <div class="modal-content">
          <!-- modal header-->
        <div class="modalHeader">
            <p>New Article</p>
        <span class="closeBtn">&times;</span>
        </div>
        <!-- inside modal-->
        <form id="article-form">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="published">Published</label>
                    <input type="date" id="published" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="site">Site</label>
                    <input type="text" id="site" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="adgroup">Ad group</label>
                    <input type="text" id="adgroup" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="bids">Bids</label>
                    <input type="number" id="bids" class="form-control" required>
                </div>
                <input type="submit" value="Create new" class="btn btn-primary btn-block">
            </form>
      </div>
    </div>

<!-- end Modal-->
              <table id="Table1" class="table table-striped mt-5">
                  <thead>
                      <tr>
                          <th onclick="javascript:SortTable(0,'T')">Title<i class="fa fa-fw fa-sort"></i></th>
                          <th onclick="javascript:SortTable(1,'D','mdy')">Published<i class="fa fa-fw fa-sort"></i></th>
                          <th onclick="javascript:SortTable(2,'T')">Site<i class="fa fa-fw fa-sort"></i></th>
                          <th onclick="javascript:SortTable(3,'T')">Ad group<i class="fa fa-fw fa-sort"></i></th>
                          <th onclick="javascript:SortTable(4,'N')">Bids<i class="fa fa-fw fa-sort"></i></th>
                          <th onclick="sortTable(5)"></th>
                      </tr>
                  </thead>
                  <tbody id="article-list"></tbody>
              </table>
              <!--Load more button-->
              <button id="load-more-comments" class="loadMore">Load More</button>
          </h1>
      </div>

          <!-- would have edit button as well, I think it would make somebody's life less difficult if you have to change something fast -->

     <!-- as well to open article and see all the properties in a modal -->

<!-- some filtering also would make it easier to navigate  -->

<!-- I believe that there is no limits in implementation -->


      <script src="main.js" defer></script>

  </body>
</html>
