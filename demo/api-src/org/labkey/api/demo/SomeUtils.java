package org.labkey.api.demo;

/**
 * Simple example of a module providing an API that's available to dependent modules
 */
public class SomeUtils
{
    private Integer usefulCount = 0;

    public void doSomethingUseful()
    {
        usefulCount++;
    }

    public Integer getUsefulCount()
    {
        return usefulCount;
    }
}
