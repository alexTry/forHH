#!/usr/bin/env python3
import random
import math

class Galaxy: 
	

#   Массив для хранения всех точек
	map = []
	
# 	Размер плоскости
	size ={'w': 1000, 'h': 1000} 
	
#   Количество точек задаем в ручную
	numbOfStars = input('Введите количество точек которое вы хотите расположить на плоскости: ')
	
#   Id для каждой точки(счетчик объектов)
	count = 0
	
#   Random инициализация координат для всех заданых пользователем точек
	def __init__(self):
		map = self.map
		
		while (self.count < int(self.numbOfStars)):
		#   Создаем объект имя/x/y. имя - присваивает текущее значение счетчика объектов. x и y - случайнай выбор от 0 до 1000		
			map.append({'name': 'Star_'+ str(self.count+1),'x':random.randrange(self.size['w']),'y':random.randrange(self.size['h'])})
		#   каждый новый объект - счетчик + 1
			self.count = self.count + 1	

#   Определяем и возвращаем расстояние между точками A и B 
	def distance(self, star1, star2):
		dist = math.sqrt(((star2['x'] - star1['x'])**2) + (star2['y'] - star1['y'])**2)
		return dist
		
#   Находим для точки A "Радиус" - ближайшую точку B из всех заданных пользователем точек и возвращаем расстояние от A до B    
	def minDistance(self,i):

	# 	Здесь будет "Радиус" точки A (Начальное значение - 0)
		minDist = 0
		
		arr = self.map
		array = range(len(arr))
	
		for index in array:
		#   Исключаем попадание в результат самой точки A 	
			if (arr[i]['x'] != arr[index]['x']) & (arr[i]['y'] != arr[index]['y']):
			
			#   Получаем текущее расстояние AB 
				dist = self.distance(arr[i], arr[index])
	
			# 	Если минимальное расстояние больше текущего или минимальное расстояние имеет начальное значение - 0, то перезаписываем минимальное расстояние текущим  		
				if (minDist == 0) | (dist < minDist):
					minDist = dist
					
		return minDist

#   Определяем "Соседей" точки A - все точки находящиеся на расстоянии "Радиуса"*2 и возвращаем их количество
	def numOfNeighbors(self,i,min):
	
	#   Счетчик "Соседей" 
		neighbors = 0
	
	# 	"Радиус" * 2
		maxDist = min*2
		
		arr = self.map
		array = range(len(arr))
		
		for index in array:
			if (arr[i]['x']!= arr[index]['x']) & (arr[i]['y'] != arr[index]['y']):
				dist = self.distance(arr[i], arr[index])
			#   Если текущее растояние AB соответствует определению "Сосед"  увеличиваем счетчик "Соседей" на 1
				if dist<= maxDist:
					neighbors = neighbors + 1
					
		return  neighbors
		
#   Вычисляем и выводим информацию по каждой точке: Имя/"Радиус"/кол-во "Соседей"
	def getInfo(self):
		arr = self.map
		array = range(len(arr))
		
		for ind in array:
			minDis = 0
			name = arr[ind]['name']
			minDis = self.minDistance(ind)
			num = self.numOfNeighbors(ind, minDis)
			
			print(name, ' - Радиус: ',minDis, ' \nсоседи: ',num , ' шт.')
			
galaxy = Galaxy()
galaxy.getInfo()


