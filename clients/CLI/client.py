import requests

MODULE_SERVICE_URL = "http://localhost:3005/api/module_service"
REVIEW_SERVICE_URL = "http://localhost:3005/api/review_service"

def getAllModules():
    response = requests.get(MODULE_SERVICE_URL + "/modules")

    if (response.status_code == 200):
        return response.json(), response.status_code
    
    return (f"Server responded with: {response.status_code}"), response.status_code

def printAllModules():
    data, response_code = getAllModules()

    if (response_code == 200):
        for module in data:
            print(f"ID: {module['id']}, Module Code: {module['code']}, Module Name: {module['name']}\n")
    else:
        print(data)     


def getReviewsForModule(moduleID: int):
    response = requests.get(REVIEW_SERVICE_URL + "/reviews/module/" + str(moduleID))

    if (response.status_code == 200):
        return response.json(), response.status_code
    
    return (f"Server responded with: {response.status_code}"), response.status_code

def printModuleReview(moduleID: int):
    data, response_code = getReviewsForModule(moduleID)

    if (response_code == 200):
        for review in data:
            print(f"Rating: {review['rating']}, Review: {review['review']} \n")
    else:
        print(data)     

def addModuleReview(moduleID: int, moduleRating, moduleReview):
    response = requests.post(REVIEW_SERVICE_URL + "/reviews", json = {
        'moduleId': moduleID,
        'review': moduleReview,
        'rating': moduleRating
    })

    if (response.status_code == 201):
        print("Review Published!")
        return
    
    print(f"Review could not be published. Server responded with: {response.status_code}")

def addNewModule(moduleCode, moduleName):
    response = requests.post(MODULE_SERVICE_URL + "/modules", json = {
        'code': moduleCode,
        'name': moduleName
    })

    if (response.status_code == 201):
        print("Module Published!")
        return
    
    print(f"Module could not be published. Server responded with: {response.status_code}")

while True:
    user_input = input("Enter a Number:\n1. Show all modules \n2. View a specific module's review \n3. Add a review \n4. Add new Module \n> ")

    try :
        user_input = int(user_input)

        if (user_input == 1):
            printAllModules()
        elif (user_input == 2):
            printAllModules()
            module_input = input("Enter the Module ID from the above list\n> ")
            module_input = int(module_input)
            printModuleReview(module_input)
        elif (user_input == 3):
            printAllModules()
            module_input = input("Enter the Module ID from the above list\n> ")
            module_input = int(module_input)
            rating_input = input("Enter module rating (1-5)\n> ")
            rating_input = int(rating_input)
            review_input = input("Enter module review\n> ")
            addModuleReview(module_input, rating_input, review_input)
        elif (user_input == 4):
            code_input = input("Enter the Module Code (Eg: CS1101S)\n> ")
            name_input = input("Enter the Module Name (Eg: Programming Methodology I)\n> ")
            addNewModule(code_input, name_input)

        else:
            print("Invalid Option\n")

    except Exception as e:
        print(e)
        print("Invalid input...\n")