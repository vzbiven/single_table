from django.shortcuts import render

# Create your views here.
def index(request):
    context_dict = {'boldmessage': 'Crunchy, creamy, cookie, candy, cupcake!'}
    return render(request, 'single_table_app/index.html', context=context_dict)