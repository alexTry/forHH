#!/usr/bin/env python3

import math

# 2. Дробь


a = input('\nВведите число A: ')
b = input('Введите число B: ')
k = int(input('Введите - К: '))

result = float(a)/float(b)
rasb = str(result).split('.')



# Метод для перевода 10 в К-ичную СС целой части числа

def iNum(n,base):
	convertString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	if n < base:
		return convertString[n]
	else:
		return iNum(n//base,base) + convertString[n%base]


# Массивы для хранения результатов возведения дробной части числа в K-ичную СС

perAr = [] 
perArDouble = []


# Метод создаёт строку с конечным результатом и выводит на экран
def createStr(p):
	mon = []# координаты скобок показывающих периода в дробной части числа
	pa = perArDouble 
	for i in range(len(pa)):
		l = i
		while l > 0:
			if mon == []:
				if pa[l-1] == pa[i]:
					mon = [(l-1),i]
					
					print('\nРезультат:\n'+iNum(int(rasb[0]),k)+'.'+p[2:l-1+2]+'('+p[l-1+2:i+2]+')\n')
					break		
			l -= 1
	if mon == []:
		if (p != '0.0'):
			print('\nРезультат:\n'+iNum(int(rasb[0]),k)+p+'\n')
		else:
			print('\nРезультат:\n'+iNum(int(rasb[0]),k)+'\n')
			
# ПРОВЕРКА! дробной части без скобок 

# 	print('Дробная часть результата:\n'+p+'\n')
	

# Метод для перевода из десятичной в К-ичную СС дробной части числа
def fNum(n, base):
	convertString = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	n = float('0.'+str(n).split('.')[1])
	i = 0
	p = '0.'
	while i < 16:
		n = n*base
		re = str(n).split('.')
		reDouble = [re[0],re[1][:6]] # !! Костыли - определяем на взгляд одинаковые числа высчитанные машиной с погрешностью (сравниваем до 6 знака после точки) 
		n = float('0.'+re[1])
		p = p + convertString[int(re[0])]
		perAr.append(re)
		perArDouble.append(reDouble)
		if n != 0: 
			i += 1
		else:
			break
	createStr(p)


fNum(result,k) 

# ПРОВЕРКА! содержимого массивов с данными

# print(perAr)
# print(perArDouble)


# P.S.

# bugs

# Программа не умеет обрабатывать отрицательные числа
# Программа умеет обрабатывать только целые числа A и B
# Программа не умеет обрабатывать такие результаты: "7e-15" (A = 10; B = 9; K = 3 )

