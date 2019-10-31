<!DOCTYPE html>

<?php

session_start();

$con = mysqli_connect('127.0.0.1', 'root', '') or die('Not connected.');
mysqli_select_db($con, 'miitsp') or die('No database found.');

//$idno = $_GET['studentid']; //ni nak get daripada mana // nak dapatkan id student dr table students //mana

if (empty($_GET['studentid'])) {
    $idno = $_SESSION['studentid'];
} else {
    $idno = $_GET['studentid'];
}

$sql1 = "SELECT * FROM students WHERE idno ='" . $idno . "'";
$query1 = mysqli_query($con, $sql1);
$row = mysqli_fetch_array($query1);

if ($row) {

    $fullname = $row['fullname'];
    $programme = $row['programme'];
    $semester = $row['semester'];
    $intake = $row['intake'];
}


if ($query1) {

    $sql2 = "SELECT * FROM preregistrations WHERE idno ='" . $idno . "'";

    $query2 = mysqli_query($con, $sql2);
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
    <script type="text/javascript" src="./lib/jquery-3.3.1.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

    <title>Pre-registration Approval</title>
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
                        <a>
                            <img src="assets/images/logo-122x122.png" alt="Mobirise" title="" style="height: 3.8rem;">
                        </a>
                    </span>
                    <span class="navbar-caption-wrap"><a class="navbar-caption text-white display-4">
                            UNIKL MIIT STUDY PLANNER</a></span>
                </div>
            </div>
            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                    <li class="nav-item"><a class="nav-link link text-white display-7" href="advisordashboard.php">
                            <span class=" mobi-mbri mobi-mbri-undo mbr-iconfont mbr-iconfont-btn"></span>BACK</a></li>
                    <li class="nav-item"><a class="nav-link link text-white display-7" href="logout.php?logout">
                            <span class="mobi-mbri mobi-mbri-logout mbr-iconfont mbr-iconfont-btn"></span>LOGOUT</a></li>
                </ul>
            </div>
        </nav>
    </section></br></br><br><br>


    <br>
    <center>
        <h1>Pre-registration Request</h1>
    </center><br><br>

    <div class="container">
        <div class="container">
            <div class="col-ld-12">

                <form method="POST">
                    <table class="table table-hover table-bordered">

                        <td> Fullname:
                        <td><?php echo $row['fullname']; ?></td>
                        </td>
                        </tr>

                        <td> ID No:
                        <td><?php echo $idno; ?></td>
                        </td>
                        </tr>

                        <td> Programme:
                        <td><?php echo $row['programme']; ?></td>
                        </td>
                        </tr>

                        <td> Semester:
                        <td><?php echo $row['semester']; ?></td>
                        </td>
                        </tr>

                        <td> Intake:
                        <td><?php echo $row['intake']; ?></td>
                        </td>
                        </tr>

                    </table><br><br>


                    <div class="container">
                        <div class="col-ld-12">
                            <table class="table table-striped table-hover table-bordered">

                                <tr>
                                    <th hidden="true"> ID </th>
                                    <th> Subject Code </th>
                                    <th> Subject Name </th>
                                    <th> Confirm </th>
                                </tr>

                                <?php

                                while ($res = mysqli_fetch_array($query2)) {
                                    # code..

                                    ?>

                                    <tr>
                                        <td hidden="true"> <?php echo $res['preregid']; ?></td>
                                        <td> <?php echo $res['subjectcode']; ?></td>
                                        <td> <?php echo $res['subjectname']; ?></td>

                                        <td> <button class="mbr-iconfont-btn btn-secondary btn-form">
                                                <a href="viewprereg.php?preregid=<?php echo $res['preregid']; ?>" class="text-white" name="select">Select</a></button> </td>

                                    </tr>
                                <?php
                                }
                                ?>

                            </table>

                            <input class="checks" type="checkbox" name="football"><b> Prerequisite checked (if subject to be enroll contain prerequisite).</b>
                            <div align="right">
                                <input class="btn btn-secondary btn-form display-4" href="approval.php" type="submit" id="submit" value="Submit">
                            </div>

                            <script type="text/javascript">
                                $('#submit').prop("disabled", true);
                                $('input:checkbox').click(function() {
                                    if ($(this).is(':checked')) {
                                        $('#submit').prop("disabled", false);
                                    } else {
                                        if ($('.checks').filter(':checked').length < 1) {
                                            $('#submit').attr('disabled', true);
                                        }
                                    }
                                });
                            </script>

                </form>
            </div>
        </div>
        </form><br><br>
    </div>
    </div>
    </div>


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
                    <div class="social-list align-right pb-2">
                    </div>
                    <div class="row row-copirayt">
                        <p class="mbr-text mb-0 mbr-fonts-style mbr-white align-center display-7">
                            © Copyright 2019 Final Year Project | Ain Mariena - All Rights Reserved.
                        </p>
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