import fitz  # PyMuPDF
import os

def extract_images_from_pdf(pdf_path, output_folder):
    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    # Open the PDF
    doc = fitz.open(pdf_path)
    image_count = 0
    
    # Iterate through each page
    for page_num in range(len(doc)):
        page = doc[page_num]
        image_list = page.get_images(full=True)
        
        # Extract images from the page
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Save the image
            image_filename = f"page_{page_num + 1}_img_{img_index + 1}.{image_ext}"
            image_path = os.path.join(output_folder, image_filename)
            
            with open(image_path, "wb") as img_file:
                img_file.write(image_bytes)
            
            image_count += 1
            print(f"Extracted: {image_filename}")
    
    doc.close()
    print(f"\nTotal images extracted: {image_count}")
    print(f"Images saved to: {output_folder}")

if __name__ == "__main__":
    pdf_path = "English Alphas Portfolio (1).pdf"
    output_folder = "showcase_images"
    extract_images_from_pdf(pdf_path, output_folder)
