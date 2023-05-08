from django.http import HttpResponse
from django.http import HttpResponseBadRequest, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from .models import Event
from .models import Like
from django.db import IntegrityError
import json
from django.contrib.auth.decorators import login_required

@csrf_exempt
def hello(request):
    return HttpResponse("Hello, world!")



@csrf_exempt

def signup(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        email = data['email']
        password = data['password']
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except IntegrityError:
            return JsonResponse({'error': 'Username already exists'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'user_id': user.id, 'username': user.username})
        else:
            return JsonResponse({'error': 'Invalid username or password'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)

@csrf_exempt
def add_event(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        title = data['title']
        description = data['description']
        # start_time = data['start_time']
        # end_time = data['end_time']
        location = data.get('location', None)
        creator_id = data['creator_id']
        event = Event.objects.create(title=title, description=description, location=location, creator_id=creator_id)
        event.save()
        return HttpResponse('Event created successfully!')
    else:
        return HttpResponse('Invalid request method')

@csrf_exempt
def get_events(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        events = Event.objects.all()
        events_list = []
        likes = Like.objects.filter(user_id=data['user_id'])
        for event in events:
            is_liked = False
            for like in likes:
                if like.event_id == event.id:
                    is_liked = True
                    break

            
            events_list.append({
                'id': event.id,
                'title': event.title,
                'description': event.description,
                'location': event.location,
                'creator_id': event.creator_id,
                'likes_count': event.likes_count,
                'is_liked': is_liked
            })
        return JsonResponse({'events': events_list})
    else:
        return HttpResponse('Invalid request method')
    
@csrf_exempt
def get_user_events(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(data)

        events = Event.objects.filter(creator_id=data['user_id'])
        likes = Like.objects.filter(user_id=data['user_id'])
        events_list = []
        for event in events:
            is_liked = False
            for like in likes:
                if like.event_id == event.id:
                    is_liked = True
                    break

            events_list.append({
                'id': event.id,
                'title': event.title,
                'description': event.description,
                'location': event.location,
                'creator_id': event.creator_id,
                'likes_count': event.likes_count,
                'is_liked': is_liked
            })
        return JsonResponse({'events': events_list})
    else:
        return HttpResponse('Invalid request method')
    
@csrf_exempt
def like_event(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        try:
            event = Event.objects.get(id=data['event_id'])
        except Event.DoesNotExist:
            return JsonResponse({'error': 'Event does not exist'}, status=400)

        # Check if the user has already liked this event
        try:
            like = Like.objects.get(event=event, user_id=data['user_id'])
            is_liked = True
        except Like.DoesNotExist:
            like = Like(event=event, user_id=data['user_id'])
            is_liked = False

        # Update the likes_count field and save the event
        if data['isLiked'] == True:
            if is_liked:
                like.delete()  # Remove the like if it exists
                event.likes_count -= 1
        else:
            if not is_liked:
                like.save()  # Save a new like
                event.likes_count += 1

        event.save()

        return JsonResponse({'message': 'Like updated successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)