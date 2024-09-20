import os
import json
from PIL import Image

permObj = {
	"template_name" : "project.type.json",
	"html_template_name" : "photo_page.template.html",
	"html_name" : "photo_page.html",
	"default_header" : "Images",
	"default_title" : "",
	"default_text" : "",
	"resize_percent" : .25,
	"valid_image_types" : [".jpg"],
	"img_template" : "<img src=\"%%image_path%%\" width=\"100%\" alt=\"Picture\">"
}

#//*** Scan sub folders for Projects to build
current_dir = os.getcwd()
scan_obj = os.scandir(current_dir)

for dir_elem in scan_obj:
	if dir_elem.is_dir():
		print("Directory: ", dir_elem.name )
		
		#//*** Check for project.type.json
		elem_dir = f"{current_dir}/{dir_elem.name}"

		filename = elem_dir+"/"+permObj["template_name"]

		#//*** Check For Template File
		if os.path.isfile(filename):
			try:
				with open(filename) as f:
					#print(f.read())
					project_info = json.load(f)
			except:
				#//*** Skip the folder on error
				print("====================================================")
				print("====================================================")
				print("Skipping Folder: " + elem_dir)
				print("Missing Template File: "+ filename )
				print("====================================================")
				print("====================================================")
				#//*** Move to Next Folder
				continue

			

			#//*** Validate the Project Template

			if "type" not in project_info.keys():
				print("Skipping")
				print("Missing Key in Template: type")
				continue

			if "template" not in project_info.keys():
				#//*** Assign default html template valuetemplate 
				print("Assigning default Template: " + permObj["html_template_name"])
				project_info["template"] = permObj["html_template_name"]

			if "header" not in project_info.keys():
				#//*** Assign default html template valuetemplate 
				print("Assigning default Header Value: " + permObj["default_header"])
				project_info["header"] = permObj["default_header"]
				
			if "title" not in project_info.keys():
				#//*** Assign default html template valuetemplate 
				print("Assigning default Title Value: " + permObj["default_title"])
				project_info["title"] = permObj["default_title"]

			if "text" not in project_info.keys():
				#//*** Assign default html template valuetemplate 
				print("Assigning default Text Value: " + permObj["default_text"])
				project_info["text"] = permObj["default_text"]

			print("Project Type JSON: Validated")


			if project_info["type"] == "images_page":
				filename = current_dir+"/"+project_info["template"]
				
				try:
					with open(filename) as f:
						out_html = f.read()
						
				except:
					#//*** Skip the folder on error
					print("====================================================")
					print("====================================================")
					print("Skipping Folder: " + elem_dir)
					print("Trouble Reading HTML Template File: "+ filename )
					print("====================================================")
					print("====================================================")
					#//*** Move to Next Folder
					continue


				#//*** Build low Res images if needed
				lowres_dir = elem_dir + "/lowres"
				if not (os.path.isdir(lowres_dir)):
					os.makedirs(lowres_dir)


				image_html = ""

				images_dir = elem_dir + "/images"

				#//*** Get List of Images to Process
				if (os.path.isdir(images_dir)):
					
					for filename in os.listdir(images_dir):
						#//*** Add whole Path to filename
						full_filepath = images_dir + "/" + filename
						if os.path.isfile(full_filepath):
							
							#//*** Validate Image Type: JPG GIF etc
							isValid = False
							for file_type in permObj["valid_image_types"]:
								
								if file_type.lower() in filename.lower():
									isValid = True
									continue

							if isValid:

								#//*** Build Low Res Image


								html_image_path = images_dir + "/"

								hires_image_path = html_image_path+filename
								lowres_image_path = elem_dir + "/lowres/"+filename

								hires_html_path = "images/"+filename
								lowres_html_path = "lowres/"+filename

								#//*** Build the Low Resolution image if it doesn't exist
								if not os.path.isfile(lowres_image_path):
									with Image.open(hires_image_path) as im:
										width, height = im.size
										resized_dimensions = (int(width * permObj["resize_percent"]), int(height * permObj["resize_percent"]))

										resized = im.resize(resized_dimensions)
										print("Resizing: "+lowres_image_path)
										resized.save(lowres_image_path)	

								#out_image = permObj["img_template"]
								#out_image = out_image.replace("%%image_path%%",hires_html_path)
								#image_html += "\t" + out_image + "\n"

								out_image = permObj["img_template"]
								out_image = out_image.replace("%%image_path%%",lowres_html_path)
								image_html += "\t" + out_image + "\n"


						else:
							print("Skipping File: " + full_filepath)
						#print( str(os.path.isfile(filename)) + " " + filename)
				print(image_html)
				#//*** Replace Values in ihe HTML Template
				out_html = out_html.replace("%%title%%",project_info["title"])
				out_html = out_html.replace("%%header%%",project_info["header"])
				out_html = out_html.replace("%%text%%",project_info["text"])
				out_html = out_html.replace("%%images%%",image_html)
				
				filename = elem_dir+"/"+permObj["html_name"] 
				#//*** Write
				f = open(filename, "w")
				f.write(out_html)
				f.close()

				print("Processed:" +filename)
			#//*** END is images_page
		else:
			print("====================================================")
			print("====================================================")
			print("Skipping Folder: " + elem_dir)
			print("Missing Template File: "+ filename )
			print("====================================================")
			print("====================================================")
			#//*** Move to Next Folder
			continue

