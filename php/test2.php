<!DOCTYPE html>
<?php

function phpAlert($msg)
{
    echo '<script type="text/javascript">alert("' . $msg . '")</script>';
}

session_start();

$con = mysqli_connect('127.0.0.1', 'root', '') or die('Not connected.');
mysqli_select_db($con, 'miitsp') or die('No database found.');

$preregid = $_GET['preregid'];
$idno = $_SESSION['user']; //ni siapa //ni session advisor


$_POST['preregid'] = $preregid;

$sql1 = "SELECT * FROM preregistrations WHERE preregid ='" . $preregid . "'";
$query1 = mysqli_query($con, $sql1);
$row = mysqli_fetch_array($query1);


if ($row) {
    $_SESSION['studentid'] = $row['idno'];
    $year = $row['year'];
    $sem = $row['sem'];
    $programme = $row['programme'];
    $subjectcode = $row['subjectcode'];
    $subjectname = $row['subjectname'];
    $credithours = $row['credithours'];
    $category = $row['category'];
    $prerequisite = $row['prerequisite'];
    $info = $row['info'];
}

if (isset($_POST['confirm'])) {

    if (empty($_POST['preregid'])) {
        $preregid = 'preregid is null';
    } else {
        $preregid = $_POST['preregid'];
    }

    if (empty($_POST['status'])) {
        $status = 'Status is null';
    } else {
        $status = $_POST['status'];
    }

    if (empty($_POST['remarks'])) {
        $remarks = 'Remarks is null';
    } else {
        $remarks = $_POST['remarks'];
    }


    $sql2 = "UPDATE preregistrations SET status='" . $status . "', remarks='" . $remarks . "' WHERE preregid=" . $preregid;

    $query2 = mysqli_query($con, $sql2);

    if ($query2) {
        header('Location:viewapproval.php');
        phpAlert("Success");
    } else {
        phpAlert("Failed");
        echo 'Approval Fail.';
    }
}



?>

<html>

<head>
    <!-- Site made with Mobirise Website Builder v4.9.7, https://mobirise.com -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="generator" content="Mobirise v4.9.7, mobirise.com">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
    <link rel="shortcut icon" href="assets/images/logo-122x122.png" type="image/x-icon">
    <meta name="description" content="Web Site Builder Description">

    <title>Subject Preregistration</title>
    <link rel="stylesheet" href="assets/web/assets/mobirise-icons2/mobirise2.css">
    <link rel="stylesheet" href="assets/web/assets/mobirise-icons-bold/mobirise-icons-bold.css">
    <link rel="stylesheet" href="assets/web/assets/mobirise-icons/mobirise-icons.css">
    <link rel="stylesheet" href="assets/tether/tether.min.css">
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-grid.min.css">
    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap-reboot.min.css">
    <link rel="stylesheet" href="assets/animatecss/animate.min.css">
    <link rel="stylesheet" href="assets/dropdown/css/style.css">
    <link rel="stylesheet" href="assets/theme/css/style.css">
    <link rel="stylesheet" href="assets/mobirise/css/mbr-additional.css" type="text/css">

</head>

<body>
    <section class="menu cid-rorJGFXrJ4" once="menu" id="menu1-1i">

        <nav class="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <div class="menu-logo">
                <div class="navbar-brand">
                    <span class="navbar-logo">
                        <a><img src="assets/images/logo-122x122.png" alt="Mobirise" title="" style="height: 3.8rem;"></a>
                    </span>
                    <span class="navbar-caption-wrap"><a class="navbar-caption text-white display-4">UNIKL MIIT STUDY PLANNER</a></span>
                </div>
            </div>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                    <li class="nav-item"><a class="nav-link link text-white display-7" href="viewapproval.php">
                            <span class=" mobi-mbri mobi-mbri-undo mbr-iconfont mbr-iconfont-btn"></span>BACK</a></li>
                    <li class="nav-item"><a class="nav-link link text-white display-7" href="logout.php?logout">
                            <span class="mobi-mbri mobi-mbri-logout mbr-iconfont mbr-iconfont-btn"></span>LOGOUT</a></li>
                </ul>
            </div>
        </nav>
    </section></br></br>

    <section class="step2 cid-rnNG2Of63Z" id="step2-11">

        <div class="container">
            <form method="POST">
                <fieldset>
                    <legend><b>Subject details below:</b></legend><br><br>

                    <table class="table table-hover ">

                        <tr>
                            <th> Recommended Year: </th>
                            <td>
                                <div><input class="form-control px-3 display-7" type="text" name="year" disabled="true" value="<?php echo $year; ?>">
                                </div></br>
                            </td>
                        </tr>

                        <tr>
                            <th> Recommended Semester: </th>
                            <td>
                                <div><input class="form-control px-3 display-7" type="text" name="sem" disabled="true" value="<?php echo $sem; ?>">
                                </div></br>
                            </td>
                        </tr>

                        <tr>
                            <th> Programme: </th>
                            <td>
                                <div><input class="form-control px-3 display-7" type="text" name="programme" disabled="true" value="<?php echo $programme  ?>">
                                </div></br>
                            </td>
                        </tr>

                        <tr>
                            <th> Subject Code: </th>
                            <td>
                                <div><input class="form-control px-3 display-7" type="text" name="subjectcode" disabled="true" value="<?php echo $subjectcode; ?>">
                                </div></br>
                            </td>
                        </tr>

                        <tr>
                            <th> Subject Name: </th>
                            <td>
                                <div><input class="form-control px-3 display-7" type="text" name="subjectname" disabled="true" value="<?php echo $subjectname; ?>">
                                </div></br>
                            </td>
                        </tr>

                        <tr>
                            <th> Credit Hours: </th>
                            <td>
                                <div><input class="form-control px-3 display-7" type="text" name="credithours" disabled="true" value="<?php echo $credithours; ?>">
                                </div></br>
                            </td>
                        </tr>

                        <tr>
                            <th> Category: </th>
                            <td>
                                <div><input class="form-control px-3 display-7" type="text" name="category" disabled="true" value="<?php echo $category; ?>">
                                </div></br>
                            </td>
                        </tr>

                        <tr>
                            <th> Prequisite Subject: </th>
                            <td>
                                <div><input class="form-control px-3 display-7" type="text" name="prerequisite" disabled="true" value="<?php echo $prerequisite; ?>">
                                </div></br>
                            </td>
                        </tr>

                        <tr>
                            <th> Additional info: </th>
                            <td>
                                <div><input class="form-control px-3 display-7" type="text" name="info" disabled="true" value="<?php echo $info; ?>">
                                </div></br>
                            </td>
                        </tr>

                        <tr>
                            <th> Status: </th>
                            <td>
                                <div>
                                    <input class="form-control px-3 display-7" list="status" name="status" value="" placeholder="status">
                                    <datalist id="status">
                                        <option value="Approve">
                                        <option value="Reject">
                                    </datalist>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th> Remarks: </th>
                            <td>
                                <div>
                                    <input class="form-control px-3 display-7 align-left" type="text" name="remarks" value="" placeholder="remarks">
                                </div>
                            </td>
                        </tr>

                    </table>

                    <div class="container align-right">
                        <input class="btn btn-secondary btn-form display-4" type="submit" name="confirm" value="Confirm">
                    </div>
                </fieldset>
            </form>
        </div>
        </div>
    </section>

    <section once="footers" class="cid-rnNF7dBtGv" id="footer7-z">
        <div class="container">
            <div class="media-container-row align-center mbr-white">
                <div class="row row-links">

                    <ul class="foot-menu">
                        <li class="foot-menu-item mbr-fonts-style display-7"></li>
                        <li class="foot-menu-item mbr-fonts-style display-7"></li>
                        <li class="foot-menu-item mbr-fonts-style display-7"></li>
                        <li class="foot-menu-item mbr-fonts-style display-7"></li>
                        <li class="foot-menu-item mbr-fonts-style display-7"></li>
                    </ul>
                </div>

                <div class="row social-row">
                    <div class="social-list align-right pb-2"></div>
                    <div class="row row-copirayt">
                        <p class="mbr-text mb-0 mbr-fonts-style mbr-white align-center display-7">
                            © Copyright 2019 Final Year Project | Ain Mariena - All Rights Reserved.</p>
                    </div>
                </div>
            </div>
    </section>
    </section>

    <section class="engine"><a href="https://mobirise.info/p">web templates free download</a></section>
    <script src="assets/web/assets/jquery/jquery.min.js"></script>
    <script src="assets/tether/tether.min.js"></script>
    <script src="assets/popper/popper.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/smoothscroll/smooth-scroll.js"></script>
    <script src="assets/touchswipe/jquery.touch-swipe.min.js"></script>
    <script src="assets/viewportchecker/jquery.viewportchecker.js"></script>
    <script src="assets/dropdown/js/script.min.js"></script>
    <script src="assets/theme/js/script.js"></script>

    <input name="animation" type="hidden">

    <?php
    mysqli_close($con);
    ?>

</body>

</html>