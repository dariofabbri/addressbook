package it.dariofabbri.test.addressbook.service.local;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class Decorator<T> implements InvocationHandler  {

	private T proxied;
	
	public Decorator(T proxied) {
		
		this.proxied = proxied;
	}
	
	@Override
	public Object invoke(Object proxy, Method method, Object[] args)
			throws Throwable {
		
		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		return method.invoke(proxied, args);
	}

	@SuppressWarnings("unchecked")
	public static<T> T createProxy(T proxied, Class<T> clazz) {
		  return (T) Proxy.newProxyInstance(
			  Thread.currentThread().getContextClassLoader(),
			  new Class[] { clazz },
			  new Decorator<T>(proxied));
	};
}
