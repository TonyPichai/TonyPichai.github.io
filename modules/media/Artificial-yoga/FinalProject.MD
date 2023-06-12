###MSC Coding 3 Final Project

For this project my aim was to generate images that translated, from one style to the another, signed hands gesture 2 yoga pose. As my data was not intended to be for literal translations my dataset was ok with being unlabeled. For this reason the CycleGAN network was my choice rather than something like Pix2Pix. 

I followed the documentation on google Colab for CycleGAN:
https://www.tensorflow.org/tutorials/generative/cyclegan
and this notebook to get started...:
https://github.com/henry32144/cyclegan-notebook/blob/master/tf_cycle_gan.ipynb


I began by collecting a dataset of Yoga Poses from Kaggle:
https://www.kaggle.com/datasets/shrutisaxena/yoga-pose-image-classification-dataset?resource=download

and a dataset of ASL gestures also from Kaggle:
https://www.kaggle.com/datasets/kuzivakwashe/significant-asl-sign-language-alphabet-dataset


I used this repository to help me normalise and orgnaise my image dataset:
https://github.com/dvschultz/dataset-tools

As not all of the images in the dataset were square I added borders and made to sure to resize the images without stretching them.
I then organised all of my images into two folders, on for Testing and one for Training. Although I eventually made reduced versions of the datasets, due to the sheer size of them, this process took several days to figure the correct results.

I then worked on uploading my datasets to google drive. Again due to the sheer size of the folders any mistakes I'd made came at a hefty cost of time in re-uploading.

Working from this notebook...:
https://colab.research.google.com/drive/1yxCexJowBCiRKnRJZsrpA1grUwbTdSkZ

After various attempts at trying to unzip my folder from the current notebook I eventually found a tool to help unzip folders on google drive:
https://colab.research.google.com/drive/1eMHKCxhSHSI_kei2rLO4smiL0z-suq9r


I began build a model.
Mounted from google drive I tried to load of the data directly into a dataset model as is in the example. However, the notebook I was working from was uploading their images into a TensorFlow Datasets. 

I had looked up how to create my own tfds, however that began to become a rabbit hole of a tangent so I decided to cut my losses and try something different. 

Instead I uploaded all of data from their individual folders into the respective yoga_train, yoga_test and hands_train, hands_test folders.

From here I ran into trouble trying to get the correct shape and sizes for my images to work with the model. I understand that the image sizes need to be divisible in order for resizing, however, I couldn't figure where I was getting this wrong.

Realising I wasn't quite grasping the cycleGAN, I decided it would be better that I tried a simpler model with only one GAN. 

Moving forward I switched to building a styleGAN model. I figured it  makes more sense to work on and understand one Discriminator/Generator model before trying to train two against one another in a cycle. This is the notebook I used:
https://colab.research.google.com/github/dvschultz/ml-art-colabs/blob/master/Stylegan2_ada_Custom_Training.ipynb#scrollTo=lohotw1FqC54

Again this was tricky. Due to the large size of my datasets waiting to find out about results took a sizeable amount of time. That, coinciding with the file structure management for files on drive was the main hurdle to get past.

I finally used a vastly reduced dataset of Yoga Poses, down to the size of the training dataset for the styleGAN model.

Although, I had wanted to get to point where I could begin to find tune my GAN admittedly, I'd run out of time. This is a result of lacking the anticipation of how tricky and time consuming organising a dataset can be, the process of learning how to upload datasets and access them online and the need of further study into understanding the methods of dataset handling in tf and for resizing from layer to layer.

![fakes000048](https://git.arts.ac.uk/storage/user/233/files/699099e7-483b-4c03-8072-9e9381c28258)

![fakes000128](https://git.arts.ac.uk/storage/user/233/files/d7a2a620-bb5e-472b-88a7-67644c29de7d)

![fakes000208](https://git.arts.ac.uk/storage/user/233/files/558a4f6b-1cf4-4305-bc51-75e3b17a17df)
