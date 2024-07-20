const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
const cors = require("cors");
require("dotenv").config();
const sendMail = require("./sendMail");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const FormData = require('form-data');
const axios = require('axios');
const puppeteer = require('puppeteer');
const AWS = require('aws-sdk');

const port = process.env.PORT || 5001;
// const uploadPath = path.join(__dirname, "public", "images"); // Specify the destination directory for images

// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }

// middleware
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(fileUpload());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, access-control-allow-origin');
  next();
});

// const uploadDirectory = path.join(__dirname, "public", "uploads");
// app.use(express.static(uploadDirectory));

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { log } = require("console");

// // Verify JWT TOken ----

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  // console.log(req.headers);
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  // bearer token
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    // console.log(err);
    if (err) {
      return res
        .status(401)
        .send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};



// node mailer --mailing section --
app.post("/mail", sendMail);

const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const UserCollection = client.db("RapidHire").collection("users");
    const jobPostCollection = client.db("RapidHire").collection("posts");
    const feedbackCollection = client.db("RapidHire").collection("feedbacks");
    const applicationsPostCollection = client.db("RapidHire").collection("applications");
    const candidatesCollection = client.db("RapidHire").collection("candidates");
    const filesCollection = client.db("RapidHire").collection("files");

    //  jwt token
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      res.send({ token });
    });

    // use express file-upload


    // app.post("/upload-new", async (req, res) => {
    //   try {
    //     if (!req.files) {
    //       return res.status(400).json({ message: "No files were uploaded." });
    //     }

    //     const imageFile = req.files.image;
    //     const resumeFile = req.files.resume;
    //     const formData = req.body;

    //     // Read image and resume files as base64
    //     const imageBase64 = imageFile.data.toString("base64");
    //     const resumeBase64 = resumeFile.data.toString("base64");

    //     // Create an array of documents to insert
    //     const documentsToInsert = {
    //       jobTitle: formData.jobTitle,
    //       stage: formData.stage,
    //       jobPosterEmail: formData.jobPosterEmail,
    //       jobId: formData.jobId,
    //       firstName: formData.firstName,
    //       lastName: formData.lastName,
    //       email: formData.email,
    //       phoneNumber: formData.phone,
    //       location: formData.address,
    //       summary: formData.summary,
    //       coverLetter: formData.coverLetter,
    //       date: new Date().toISOString(),
    //       educationList: JSON.parse(formData.educationList),
    //       experienceList: JSON.parse(formData.experienceList),
    //       image: `data:image/jpeg;base64,${imageBase64}`, // Store the image as a data URL
    //       resume: `data:application/pdf;base64,${resumeBase64}`, // Store the resume as a data URL
    //     };
    //     console.log(req.body);

    //     // Insert the documents into the collection
    //     await applicationsPostCollection.insertOne(documentsToInsert);

    //     return res.status(201).json({ message: "Application submitted successfully" });
    //   } catch (error) {
    //     console.error("Error submitting application:", error);
    //     return res.status(500).json({
    //       message: "An error occurred while submitting the application",
    //     });
    //   }
    // });


    // feedback post api

    app.post('/feedback', async (req, res) => {
      const data = req.body;
      const result = await feedbackCollection.insertOne(data);
      res.send(result);
    })

    // feedback get api

    app.get('/all-feedbacks', async (req, res) => {
      const result = await feedbackCollection.find({}).toArray();
      res.send(result)
    })




    app.post("/upload-new", async (req, res) => {
      try {
        // Extract data from the request body
        const {
          jobTitle,
          stage,
          jobPosterEmail,
          jobId,
          firstName,
          lastName,
          email,
          phone,
          address,
          summary,
          coverLetter,
          educationList,
          experienceList,
          imageData, // Base64-encoded image data
          resumeData, // Base64-encoded resume data
        } = req.body;

        // Create a document to insert into your MongoDB collection
        const documentToInsert = {
          jobTitle,
          stage,
          jobPosterEmail,
          jobId,
          firstName,
          lastName,
          email,
          phoneNumber: phone, // Rename phone to phoneNumber
          location: address, // Rename address to location
          summary,
          coverLetter,
          date: new Date().toISOString(),
          educationList: JSON.parse(educationList),
          experienceList: JSON.parse(experienceList),
          image: imageData, // Store base64-encoded image data as a string
          resume: resumeData, // Store base64-encoded resume data as a string
        }; await applicationsPostCollection.insertOne(documentToInsert);

        return res
          .status(201)
          .json({ message: "Application submitted successfully" });
      } catch (error) {
        console.error("Error submitting application:", error);
        return res.status(500).json({
          message: "An error occurred while submitting the application",
        });
      }
    });

    //  for multer image and resume

    // app.post(
    //   "/upload",
    //   upload.fields([{ name: "resume" }, { name: "image" }]),
    //   async (req, res) => {
    //     const formData = req.body;
    //     const resumeFilePath = req.files.resume[0].filename; // Accessing resume filename
    //     const imageFilePath = req.files.image[0].filename; // Accessing image filename
    //     const educationList = JSON.parse(formData.educationList); // Parse educationList JSON
    //     const experienceList = JSON.parse(formData.experienceList); // Parse experienceList JSON
    //     const currentDate = new Date().toISOString();
    //     try {
    //       // Assuming you have a MongoDB connection named "db" and a collection named "applicationsPostCollection"
    //       await applicationsPostCollection.insertOne({
    //         jobTitle: formData.jobTitle,
    //         stage: formData.stage,
    //         jobPosterEmail: formData.jobPosterEmail,
    //         jobId: formData.jobId,
    //         firstName: formData.firstName,
    //         lastName: formData.lastName,
    //         email: formData.email,
    //         phoneNumber: formData.phone,
    //         location: formData.address,
    //         summary: formData.summary,
    //         resume: resumeFilePath,
    //         coverLetter: formData.coverLetter,
    //         image: imageFilePath,
    //         date: currentDate,
    //         educationList: educationList, // Save parsed educationList
    //         experienceList: experienceList,
    //         // stage: formData.stage,
    //         // appliedJobId: formData.appliedJobId,
    //       });

    //       res
    //         .status(201)
    //         .json({ message: "Application submitted successfully" });
    //     } catch (error) {
    //       console.error("Error submitting application:", error);
    //       res.status(500).json({
    //         message: "An error occurred while submitting the application",
    //       });
    //     }
    //   }
    // );

    // post data of a new user
    // app.post("/user", async (req, res) => {
    //   const query = req.body;
    //   const result = await UserCollection.insertOne(query);
    //   res.send(result);
    // });

    // sobuj code
    // save applicants

    app.put("/users/:email", async (req, res) => {
      const email = req.params.email;
      const user = req.body;
      const query = { email: email };
      const options = { upsert: true };
      const updateDoc = {
        $set: user,
      };
      const result = await UserCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // source increase by id

    app.patch("/sourced/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      const updateDoc = {
        $inc: {
          source: 1,
        },
      };

      const result = await jobPostCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // update two field

    // all applicant post job get
    app.get("/candidate-stage/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const result = await applicationsPostCollection
          .find({ appliedJobId: id }) // Use the correct field name and ID
          .toArray();

        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching data");
      }
    });

    // add candidate
    app.post("/candidate", async (req, res) => {
      const query = req.body;
      const fileData = {
        candidateId: null,
        resume: query.resume,
      };
      delete query.resume;
      const result = await candidatesCollection.insertOne(query);
      fileData.candidateId = result.insertedId;
      const fileResult = await filesCollection.insertOne(fileData);
      res.send(result);
    });

    // update two elements

    // put data as a new user
    app.post("/user", async (req, res) => {
      // const email = req.params.email;
      // console.log(email);
      const query = req.body;
      // const query = { email: email };
      // console.log(query);
      // const options = { upsert: true };
      const result = await UserCollection.insertOne(query);
      // const updateDoc = {
      //   $set: user,
      // };
      // const result = await UserCollection.updateOne(query, updateDoc, options);
      // console.log(result);
      res.send(result);
    });

    // --------------------admin---------------
    // make admin
    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      // console.log(id);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };

      const result = await UserCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // get admin data,is it admin or not
    app.get("/users/admin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }
      // console.log(req.decoded.email);
      const query = { email: email };
      console.log(query);
      const user = await UserCollection.findOne(query);
      const result = { admin: user?.role === "admin" };
      // const result = { admin: true };
      res.send(result);
    });

    // verify admin
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await UserCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden message" });
      }
      next();
    };

    // get users data  info
    app.get("/users", verifyJWT, verifyAdmin, async (req, res) => {
      const result = await UserCollection.find().toArray();
      res.send(result);
    });

    // delete user
    app.delete("/delete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await UserCollection.deleteOne(query);
      res.send(result);
    });

    // -----------------post job ---------------
    // post a new job
    app.post("/job_post", async (req, res) => {
      const query = req.body;
      const result = await jobPostCollection.insertOne(query);
      res.send(result);
    });
    // --------------------use test -------
    app.post("/new", async (req, res) => {
      const query = req.body;
      const result = await jobPostCollection.insertOne(query);
      res.send(result);
    });
    app.get("/job_post/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobPostCollection.findOne(query);
      res.send(result);
    });

    // get all job post

    app.get("/all-post/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobPostCollection.findOne(query);
      res.send(result);
    });

    app.patch("/all-post/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const update = { $set: req.body };
      const result = await jobPostCollection.updateOne(query, update);
      res.send(result);
    });
    app.delete("/all-post/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await jobPostCollection.deleteOne(query);
      } catch (error) {
        console.error("Error deleting the post:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    app.get("/all-post", async (req, res) => {
      const result = await jobPostCollection.find().sort({ _id: -1 }).toArray();
      res.send(result);
    });

    // post application

    app.post("/application-post", async (req, res) => {
      const query = req.body;
      const result = await applicationsPostCollection.insertOne(query);
      res.send(result);
    });

    app.get("/all-applications/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const fileQuery = { candidateId: new ObjectId(id) };
      const candidateResult = await candidatesCollection.findOne(query);
      const fileResult = await filesCollection.findOne(fileQuery);
      if (fileResult) {
        candidateResult.resume = fileResult.resume;
        candidateResult.imageData = fileResult.imageData;
      }
      res.send(candidateResult);
    });

    // sorting get data -and get data all candidates
    app.get("/all-applications", async (req, res) => {
      try {
        const result = await applicationsPostCollection.find().toArray();

        res.send(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });


    // test  get candidate by specific jobs
    app.get("/all-candidate/:email", async (req, res) => {
      const email = req.params.email;
      // console.log(email);

      try {
        const candidateResult = await candidatesCollection
          .find({ jobPosterEmail: email })
          .toArray();
        // const filesResult = await filesCollection.find({}).toArray();
        // const mergedResult = []
        // for (var i = 0; i < candidateResult.length; i++) {
        //   for (var j = 0; j < filesResult.length; j++) {
        //     if (candidateResult[i]._id.toString() == filesResult[j].candidateId.toString()) {
        //       const a = {
        //         _id: candidateResult[i]._id,
        //         imageData: filesResult[j].imageData,
        //         fullName: candidateResult[i].fullName,
        //         location: candidateResult[i].location,
        //         date: candidateResult[i].date,
        //         jobTitle: candidateResult[i].jobTitle,
        //       };
        //       mergedResult.push(a)
        //     }
        //   }
        // }
        // res.send(mergedResult);
        res.send(candidateResult);
      } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching data");
      }
    });

    // all applicant set stages-----------------------------
    app.patch("/applicant/stage/:id", async (req, res) => {
      const id = req.params.id;
      const stage = req.body.stage;
      console.log(stage);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          stage: stage,
        },
      };

      try {
        const result = await applicationsPostCollection.updateOne(
          filter,
          updateDoc
        );

        if (result.modifiedCount === 1) {
          res.status(200).send(`Updated ${id}'s stage to ${stage}`);
        } else {
          res.status(404).send("Applicant not found");
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }
    });

    // seatch candidate option
    app.get("/candidates/:text", async (req, res) => {
      const searchText = req.params.text;

      // Check if searchText is empty or not provided
      if (!searchText) {
        return res.status(400).send("Please provide a search text.");
      }

      try {
        // Use a consistent error message for potential errors
        const result = await applicationsPostCollection
          .find({
            name: {
              $regex: searchText,
              $options: "i",
            },
          })
          .toArray();

        // Return a meaningful response
        res.status(200).json(result);
      } catch (error) {
        console.error(error);
        // Handle the error more gracefully
        res
          .status(500)
          .json({ error: "An error occurred while searching for candidates." });
      }
    });

    // delete a candidate
    app.delete("/delete-candidate/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const fileQuery = { candidateId: new ObjectId(id) }
      const file = await filesCollection.deleteOne(fileQuery);
      const result = await candidatesCollection.deleteOne(query);
      res.send(result);
    });

    app.delete("/delete-jobCollection", async (req, res) => {
      const result = await jobPostCollection.drop();
      res.send(result);
    });

    app.get("/all-applications2", async (req, res) => {
      // const id = req.params.id;
      const search = req.query.search;
      // console.log(search);
      // const query = { _id: new ObjectId(id) };
      const query = { location: { $regex: search, $options: "i" } }
      const query2 = { jobTitle: { $regex: search, $options: "i" } }
      const query3 = { firstName: { $regex: search, $options: "i" } }

      const application = applicationsPostCollection.find(query, query2, query3);
      const result = await application.toArray()
      res.send(result);
    });

    // candidateSearch
    app.get("/candidateSearch", async (req, res) => {
      const search = req.query.search;
      const query = { fullName: { $regex: search, $options: "i" } };
      const application = candidatesCollection.find(query);
      const result = await application.toArray()
      res.send(result);
    });

    // search candidates

    // resume app.use('/uploads', upload.array("image", "resume"));


    const uploadInS3 = async (pdfBuffer, emailAddress) => {
      try {
        const s3 = new AWS.S3({
          accessKeyId: 'AKIAWVLSLR74DC7MNYP3',
          region: 'us-east-1'
        });

        const params = {
          Bucket: "ipivot-rapidhire",
          Key: `${emailAddress}.pdf`,
          Body: pdfBuffer,
        };

        const uploadResult = await s3.upload(params).promise();
        console.log('Uploaded PDF:', uploadResult.Location);

        const objParams = {
          Bucket: "ipivot-rapidhire",
          Key: `${emailAddress}.pdf`,
          Expires: 900,
          ResponseContentType: 'application/pdf',
          ResponseContentDisposition: 'inline'
        }

        const preSignedUrl = s3.getSignedUrl('getObject', objParams);
        return preSignedUrl
      } catch (err) {
        console.log(err);
      }
    };

    async function modifyAndDisplayPDF(pdfUrl, fullName, emailAddress) {

      const browser = await puppeteer.launch({ timeout: 0 });
      const page = await browser.newPage();

      try {
        await page.goto(pdfUrl, { timeout: 60000 });

        const iframeHandle = await page.$('#pdf-iframe-edit');
        const iframSrc = await page.evaluate(body => body.src, iframeHandle);
        await iframeHandle.dispose();

        const page2 = await browser.newPage();
        await page2.goto(iframSrc);

        const nameHandle = await page2.$('#pdf-text-name');
        const newName = await page2.evaluate((fullName, y) => {
          y.textContent = fullName
          return y.textContent
        }, fullName, nameHandle)

        const imgHandle = await page2.$('.document-logo');
        const imgName = await page2.evaluate((y) => {
          y.src = "https://ipivot.io/wp-content/uploads/2023/07/ipivot-light-bg-logo-new-2.svg"
          return y.src
        }, imgHandle)

        const bodyHandle2 = await page2.$('html');
        const name = await page2.evaluate(x => x.outerHTML, bodyHandle2);

        await page2.setContent(name, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page2.pdf({ path: 'downloaded.pdf', format: 'A4' });

        const s3Url = await uploadInS3(pdfBuffer, emailAddress);

        return s3Url;

      } catch (error) {
        console.error('Error processing PDF:', error);
        throw error;
      } finally {
        await browser.close();
      }


    }


    app.get('/generatepdf', async (req, res) => {
      try {
        const email = 'satya@ipivot.io';
        const password = 't3pmP1ss!';
        let fullName = req.query.fullName;
        fullName = fullName.includes("%20") ? fullName.replace("%20", " ") : fullName;
        const emailAddress = req.query.emailAddress;
        const phoneNumber = req.query.phoneNumber;

        let result;

        const s3 = new AWS.S3({
          accessKeyId: 'AKIAWVLSLR74DC7MNYP3',
          region: 'us-east-1'
        });

        const params = {
          Bucket: "ipivot-rapidhire",
          Key: `${emailAddress}.pdf`,
        }

        const objectExists = await s3.headObject(params).promise()
          .then(() => true)
          .catch(err => {
            if (err.code === 'NotFound') {
              return false;
            } else {
              throw err;
            }
          });

        console.log("objectExists", objectExists);

        if (objectExists) {
          const objParams = {
            Bucket: "ipivot-rapidhire",
            Key: `${emailAddress}.pdf`,
            Expires: 900,
            ResponseContentType: 'application/pdf',
            ResponseContentDisposition: 'inline'
          }

          const preSignedUrl = s3.getSignedUrl('getObject', objParams);
          const response = {
            url: preSignedUrl,
            isGenerated: false
          }
          res.send(response);
        } else {
          const apiUrl = 'https://turbocheck.com/xray_auth';

          const formData = new FormData();

          formData.append('email', email);
          formData.append('password', password);
          formData.append('fullName', fullName);
          formData.append('emailAddress', emailAddress);
          formData.append('phoneNumber', phoneNumber);

          result = await axios.post(apiUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }).then(response => {
            console.log(response.data);
            return response.data;
          }).catch(error => {
            console.log(`Error ${error}`);
          });

          const pdfUrl = result;
          const newText = 'Harsh Kumar Lal Das'; // Replace with the new title text
          const s3Url = await modifyAndDisplayPDF(pdfUrl, fullName, emailAddress);
          const response = {
            url: s3Url,
            isGenerated: true
          }
          res.send(response);
        }
      } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("RapidHire Server is running..");
});

app.listen(port, () => {
  console.log(`RapidHire is running on port ${port}`);
});