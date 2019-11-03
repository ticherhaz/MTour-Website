<?php
// Include config file
include("includes/config1.php");
 
// Define variables and initialize with empty values
$name = $address = $email= $level_err = $dateInPosition_err ="";
$name_err = $address_err = $email_err = $level_err = $dateInPosition_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate name
    $input_name = trim($_POST["name"]);
    if(empty($input_name)){
        $name_err = "Please enter a name.";
    } elseif(!filter_var($input_name, FILTER_VALIDATE_REGEXP, array("options"=>array("regexp"=>"/^[a-zA-Z\s]+$/")))){
        $name_err = "Please enter a valid name.";
    } else{
        $name = $input_name;
    }
   
    // Validate address
    $input_address = trim($_POST["address"]);
    if(empty($input_address)){
        $address_err = "Please enter an address.";    
    } else{
        $address = $input_address;
    }
   
    // Validate salary
    $input_nric = trim($_POST["nric"]);
    if(empty($input_)){
            $nric_err = "Please enter IC number.";    
    } elseif(!ctype_digit($input_nric)){
        $nric_err = "Please enter a positive integer value.";
    } else{
        $nric = $input_nric;
    }
   
   
     // Validate address
        $input_level = trim($_POST["level"]);
        if(empty($input_level)){
            $level_err = "Please enter an address.";    
        } else{
            $level = $input_level;
        }
       

// Validate address
   $input_dateInPosition = trim($_POST["dateInPosition"]);
   if(empty($input_dateInPosition)){
       $dateInPosition_err = "Date in Position.";    
   } else{
   $position= $input_position;
   }
   
    // Check input errors before inserting in database
    if(empty($name_err) && empty($address_err) && empty($email_err) && empty($level_err) && empty($dateInPosition_err)){
        // Prepare an insert statement
        $sql = "INSERT INTO employee (name, address, email, level, dateInPosition) VALUES (?, ?, ?, ?, ?)";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "sssss", $param_name, $param_address, $param_email, $param_level, $param_dateInPosition);
           
            // Set parameters
            $param_name = $name;
            $param_address = $address;
            $param_email = $email;
              $param_level = $level;
               $param_dateInPosition = $dateInPosition;
           
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Records created successfully. Redirect to landing page
                header("location: stafflist.php");
                exit();
            } else{
                echo "Something went wrong. Please try again later.";

?>

<?php include('includes/header.php'); ?>
<body id="page-top">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div class="sidebar-brand-icon rotate-n-15">
          <i class=""></i>
        </div>
        <div class="sidebar-brand-text mx-3">Admin<sup></sup></div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
        <a class="nav-link" href="admin_homepage.php">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
     
      </div>

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i class="fas fa-fw fa-cog"></i>
          <span>Manage User</span>
        </a>
        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="stafflist.php">View All User</a>
            <a class="collapse-item" href="add_user.php">Add New User</a>
     <a class="collapse-item" href="admin_profile.php">View My Profile</a>
          </div>
        </div>
      </li>

      <!-- Nav Item - Utilities Collapse Menu -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
          <i class="fas fa-fw fa-wrench"></i>
          <span>Manage KPI</span>
        </a>
        <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">        
            <a class="collapse-item" href="templatelist.php">View KPI List</a>
            <a class="collapse-item" href="template.php">Add New KPI Template</a>
         
          </div>
        </div>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Addons
      </div>

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item">
        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i class="fas fa-fw fa-folder"></i>
          <span>Report</span>
        </a>
        <div id="collapsePages" class="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div class="bg-white py-2 collapse-inner rounded">
            <a class="collapse-item" href="login.html">View All Evaluation Form</a>
               <a class="collapse-item" href="login.html">Generate Report </a>
   
           
          </div>
        </div>
      </li>


    </ul>
    <!-- End of Sidebar -->
    <!-- Content Wrapper -->
       <div id="content-wrapper" class="d-flex flex-column">
   
         <!-- Main Content -->
         <div id="content">
   
           <!-- Topbar -->
           <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
   
             <!-- Sidebar Toggle (Topbar) -->
             <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
               <i class="fa fa-bars"></i>
             </button>
   
             <!-- Topbar Search -->
             <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
               <div class="input-group">
                 <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                 <div class="input-group-append">
                   <button class="btn btn-primary" type="button">
                     <i class="fas fa-search fa-sm"></i>
                   </button>
                 </div>
               </div>
             </form>
   
             <!-- Topbar Navbar -->
             <ul class="navbar-nav ml-auto">
   
               <!-- Nav Item - Search Dropdown (Visible Only XS) -->
               <li class="nav-item dropdown no-arrow d-sm-none">
                 <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   <i class="fas fa-search fa-fw"></i>
                 </a>
                 <!-- Dropdown - Messages -->
                 <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                   <form class="form-inline mr-auto w-100 navbar-search">
                     <div class="input-group">
                       <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                       <div class="input-group-append">
                         <button class="btn btn-primary" type="button">
                           <i class="fas fa-search fa-sm"></i>
                         </button>
                       </div>
                     </div>
                   </form>
                 </div>
               </li>
   
           
   
               <div class="header"></div>
   
               <!-- Nav Item - User Information -->
               <li class="nav-item dropdown no-arrow">
                 <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   <span class="mr-2 d-none d-lg-inline text-gray-600 small"></span>
                   <img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60">
                 </a>
                 <!-- Dropdown - User Information -->
                 <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                 
                 
                 
                   
                   <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                     <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                     Logout
                   </a>
                 </div>
               </li>
   
             </ul>
   
           </nav>
           <!-- End of Topbar -->
           <!-- End of Topbar -->
        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
           
          </div>

        <!-- /.container-fluid -->
 
         <!-- Begin Page Content -->
         <div class="container-fluid">
 
           <!-- Page Heading -->
         
           <!-- DataTales Example -->
           <div class="card shadow mb-4">
             <div class="card-header py-3">
               <h6 class="m-0 font-weight-bold text-primary">Add New User</h6>
             </div>
             <div class="card-body">
   
                <!-- Username -->
<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                       <div class="form-group <?php echo (!empty($name_err)) ? 'has-error' : ''; ?>"></textarea>
                           <label>Name</label>
   <div class="form-group">
                           <input type="text" name="name" class="form-control"<?php echo $name; ?>">
                           <p><span class="help-block">Please Enter a valid name<?php echo $name_err;?></span></p>
                       </div>
<div class="form-group <?php echo (!empty($email_err)) ? 'has-error' : ''; ?>"></textarea>
                           <label>Email</label>
   <div class="form-group">
                           <input type="email" name="email" class="form-control"<?php echo $email; ?>">
                           <p><span class="help-block">Email can contain any letters or numbers without spaces<?php echo $name_err;?></span></p>
                       </div>
                       <div class="form-group <?php echo (!empty($address_err)) ? 'has-error' : ''; ?>">
                           <label>Address</label>
                           <textarea name="address" class="form-control"><?php echo $address; ?></textarea>
                           <span class="help-block"><?php echo $address_err;?></span>
                       </div>
                       <div class="form-group <?php echo (!empty($nric_err)) ? 'has-error' : ''; ?>">
                           <label>NRIC</label>
                           <input type="text" name="nric" class="form-control" value="<?php echo $nric; ?>">
                           <span class="help-block"><?php echo $nric_err;?></span>
                       </div>
<div class="form-group <?php echo (!empty($level_err)) ? 'has-error' : ''; ?>">
 <label>Position</label>
                           <input type="text" name="level" class="form-control" value="<?php echo $level; ?>">
                           <span class="help-block"><?php echo $level_err;?></span>
                       </div>
<div class="form-group <?php echo (!empty($dateInPosition_err)) ? 'has-error' : ''; ?>">
                           <label>Date in Position </label>
                           <input type="text" name="dateInPosition" class="form-control" value="<?php echo $dateInPosition; ?>">
                           <span class="help-block"><?php echo $dateInPosition_err;?></span>
                       </div>


                       <input type="submit" name="submit" class="btn btn-primary" value="Save">
                       <a href="stafflist.php" class="btn btn-default">Cancel</va>>
                   </form>
                   
                 
               </div>
             </div>
           </div>
 
         </div>
         <!-- /.container-fluid -->
 
       </div>
       <!-- End of Main Content -->
    <!-- Logout Modal-->
      <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div class="modal-footer">
              <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <a class="btn btn-primary" href="admin_login.php">Logout</a>
            </div>
          </div>
        </div>
      </div>
         <!-- End of Page Wrapper -->
         
           </div>
    <?php
                 include('includes/script.php');
         
              include('includes/footer.php');
           ?>
 </div>       
