export const confirmEmailTemplet = async (link) => {
  return `<!DOCTYPE html>
                <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
                <style type="text/css">
                body{background-color: #88BDBF;margin: 0px;}
                </style>
                <body style="margin:0px;"> 
                <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
                <tr>
                <td>
                <table border="0" width="100%">
                <tr>
                <td>
                <h1>
                    <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
                </h1>
                </td>
                <td>
                <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                <tr>
                <td>
                <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
                <tr>
                <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
                <img width="50px" height="50px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
                </td>
                </tr>
                <tr>
                <td>
                <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
                </td>
                </tr>
                <tr>
                <td>
                <p style="padding:0px 100px;">
                </p>
                </td>
                </tr>
                <tr>
                <td>
                <a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B; ">Verify Email address</a>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                <tr>
                <td>
                <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
                <tr>
                <td>
                <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
                </td>
                </tr>
                <tr>
                <td>
                <div style="margin-top:20px;">

                <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
                <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
                
                <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
                <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
                </a>
                
                <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
                <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
                </a>

                </div>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                </body>
                </html>`;
};

export const hellowpage = async () => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mohamed Hamed Portfolio</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #333;
            color: #fff;
        }

        .container {
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #444;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
        }

        h2 {
            font-size: 30px;
            margin-bottom: 10px;
            color: #9c9fde;
        }

        span {
            color: #007bff;
            font-weight: bold;
        }

        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 10px;
        }

        a {
            color: #fff;
            text-decoration: none;
            font-size: 18px;
            padding: 8px 12px;
            border-radius: 5px;
            background-color: #007bff;
            transition: background-color 0.3s, color 0.3s;
        }

        a:hover {
            background-color: #06325f;
        }

        .social-icons {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .social-icons a {
            display: inline-block;
            margin-right: 10px;
            font-size: 24px;
            color: #fff;
        }

        img {
            max-width: 300px;
            border-radius: 10px;
            margin-right: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
    </style>
</head>

<body>
    <div class="container">
        <img src="https://res.cloudinary.com/dxjng5bfy/image/upload/v1707436978/Genaral%20IMgs/feh8uaxqd3otanlc9lao.jpg"
            alt="Mohamed Hamed">
        <div>
            <h2>My Name is <span>Mohamed Hamed</span></h2>
            <p>Backend Node.js Developer</p>
            <h4>Welcome to My API Services</h4>
            <p>Click this <a href="https://documenter.getpostman.com/view/27782301/2s9Ye8fup3">link</a> to view <span>
                    API project documentation.</span></p>
            <p>To view the full <span>project on GitHub</span> click this <a
                    href="https://github.com/M2020sal2/EcommerceAPP_-Recap/tree/main">Link</a>.</p>
        </div>
    </div>
    <div class="social-icons">
        <a href="https://github.com/M2020sal2" target="_blank"><i class="fab fa-github"></i>GitHub</a>
        <a href="https://www.linkedin.com/in/mohamed-hamed-9b2655225/" target="_blank"><i
                class="fab fa-linkedin"></i>LinkedIn</a>
    </div>
</body>

</html>`;
};
